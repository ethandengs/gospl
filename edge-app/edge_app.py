#!/usr/bin/env python3

import asyncio
import logging
import os
import yaml
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path

# Local imports
from sensors.slipper_sensor import SlipperSensor
from processing.etl import DataProcessor
from processing.gait_analysis import GaitAnalyzer
from processing.anomaly_detection import AnomalyDetector
from network.supabase_client import SupabaseClient

# Load environment variables
load_dotenv()

class GosplEdgeApp:
    def __init__(self, config_path: str = "config.yaml"):
        self.config = self._load_config(config_path)
        self._setup_logging()
        
        # Initialize components
        self.sensor = SlipperSensor(self.config["sensors"]["slipper"])
        self.processor = DataProcessor()
        self.gait_analyzer = GaitAnalyzer(self.config["analysis"])
        self.anomaly_detector = AnomalyDetector(self.config["analysis"])
        
        # Initialize cloud client
        self.cloud = SupabaseClient(
            url=os.getenv("SUPABASE_URL") or self.config["supabase"]["url"],
            key=os.getenv("SUPABASE_ANON_KEY") or self.config["supabase"]["anon_key"],
            user_id=os.getenv("SUPABASE_USER_ID") or self.config["supabase"]["user_id"]
        )
        
        self.last_upload_time = datetime.now()
        self.running = False
        
    def _load_config(self, config_path: str) -> dict:
        """Load configuration from YAML file."""
        with open(config_path, 'r') as f:
            return yaml.safe_load(f)
            
    def _setup_logging(self):
        """Configure logging based on config settings."""
        log_config = self.config["logging"]
        logging.basicConfig(
            level=getattr(logging, log_config["level"]),
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_config["file"]),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger("GOSPL")
        
    async def _process_sensor_data(self, raw_data: dict):
        """Process incoming sensor data and detect anomalies."""
        # Transform raw sensor data into features
        processed_data = self.processor.process(raw_data)
        
        # Analyze gait patterns
        gait_metrics = self.gait_analyzer.analyze(processed_data)
        
        # Check for anomalies (falls or irregular patterns)
        anomalies = self.anomaly_detector.detect(processed_data, gait_metrics)
        
        # If any critical anomalies (like falls), send alert immediately
        if any(a["severity"] == "critical" for a in anomalies):
            await self._send_alerts(anomalies)
            
        # Store processed data for periodic upload
        self._cache_data(gait_metrics)
        
        # Check if it's time for periodic upload
        await self._check_periodic_upload()
        
    async def _send_alerts(self, anomalies: list):
        """Send critical alerts to the cloud immediately."""
        try:
            for anomaly in anomalies:
                if anomaly["severity"] == "critical":
                    await self.cloud.send_alert(anomaly)
                    self.logger.info(f"Sent critical alert: {anomaly['type']}")
        except Exception as e:
            self.logger.error(f"Failed to send alert: {e}")
            
    def _cache_data(self, data: dict):
        """Cache processed data for periodic upload."""
        # Implementation for local caching
        pass
        
    async def _check_periodic_upload(self):
        """Check if it's time to upload cached data to cloud."""
        now = datetime.now()
        if (now - self.last_upload_time).total_seconds() >= self.config["data"]["upload_interval_s"]:
            try:
                # Upload cached data
                await self.cloud.upload_gait_data(self.processor.get_cached_data())
                self.last_upload_time = now
                self.logger.info("Uploaded periodic gait data to cloud")
            except Exception as e:
                self.logger.error(f"Failed to upload periodic data: {e}")
                
    async def _sensor_callback(self, data: dict):
        """Callback function for new sensor data."""
        try:
            await self._process_sensor_data(data)
        except Exception as e:
            self.logger.error(f"Error processing sensor data: {e}")
            
    async def start(self):
        """Start the edge application."""
        self.running = True
        self.logger.info("Starting GOSPL Edge Application")
        
        try:
            # Connect to sensor
            await self.sensor.connect()
            
            # Start sensor data collection
            await self.sensor.start_collection(self._sensor_callback)
            
            # Keep running until stopped
            while self.running:
                await asyncio.sleep(1)
                
        except Exception as e:
            self.logger.error(f"Error in main loop: {e}")
            self.running = False
            
        finally:
            await self.stop()
            
    async def stop(self):
        """Stop the edge application."""
        self.running = False
        await self.sensor.disconnect()
        self.logger.info("GOSPL Edge Application stopped")

def main():
    # Create cache directory if it doesn't exist
    Path("./cache").mkdir(exist_ok=True)
    
    # Initialize and run the edge application
    app = GosplEdgeApp()
    try:
        asyncio.run(app.start())
    except KeyboardInterrupt:
        logging.info("Application terminated by user")
    except Exception as e:
        logging.error(f"Application error: {e}")

if __name__ == "__main__":
    main() 