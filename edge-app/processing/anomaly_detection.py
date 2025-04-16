import numpy as np
from typing import Dict, List
import logging
from datetime import datetime

logger = logging.getLogger("GOSPL.anomaly")

class AnomalyDetector:
    """Detect falls and gait abnormalities from sensor data."""
    
    def __init__(self, config: Dict):
        """Initialize the anomaly detector.
        
        Args:
            config: Configuration dictionary with detection parameters
        """
        self.config = config
        self.fall_config = config["fall_detection"]
        self.anomaly_config = config["anomaly_detection"]
        
        # State for fall detection
        self.last_impact_time = None
        self.inactivity_start = None
        self.baseline_gait_speed = None
        
    def detect(self, processed_data: Dict, gait_metrics: Dict) -> List[Dict]:
        """Detect anomalies in the sensor data and gait patterns.
        
        Args:
            processed_data: Dictionary of processed sensor features
            gait_metrics: Dictionary of current gait metrics
            
        Returns:
            List of detected anomalies
        """
        anomalies = []
        
        # Check for falls
        if self._detect_fall(processed_data):
            anomalies.append(self._create_fall_alert(processed_data["timestamp"]))
            
        # Check for gait anomalies
        gait_anomalies = self._detect_gait_anomalies(gait_metrics)
        anomalies.extend(gait_anomalies)
        
        return anomalies
        
    def _detect_fall(self, data: Dict) -> bool:
        """Detect if a fall has occurred based on sensor data.
        
        Args:
            data: Dictionary of processed sensor features
            
        Returns:
            True if a fall is detected
        """
        if not data:
            return False
            
        current_time = data.get("timestamp")
        if not current_time:
            return False
            
        # Check for impact (high acceleration)
        acc_magnitude = data.get("acc_magnitude", 0)
        if acc_magnitude > self.fall_config["impact_threshold_g"]:
            self.last_impact_time = current_time
            self.inactivity_start = current_time
            return False  # Wait for inactivity confirmation
            
        # Check for inactivity after impact
        if self.last_impact_time and self.inactivity_start:
            # Check if there's been minimal movement
            if acc_magnitude < 0.2:  # Low activity threshold
                inactivity_duration = current_time - self.inactivity_start
                if inactivity_duration >= self.fall_config["inactivity_time_s"]:
                    # Reset state
                    self.last_impact_time = None
                    self.inactivity_start = None
                    return True  # Fall detected
            else:
                # Movement detected, reset inactivity monitoring
                self.inactivity_start = current_time
                
        return False
        
    def _detect_gait_anomalies(self, metrics: Dict) -> List[Dict]:
        """Detect anomalies in gait patterns.
        
        Args:
            metrics: Dictionary of current gait metrics
            
        Returns:
            List of detected gait anomalies
        """
        anomalies = []
        if not metrics:
            return anomalies
            
        timestamp = metrics.get("timestamp")
        if not timestamp:
            return anomalies
            
        # Update baseline gait speed if not set
        if self.baseline_gait_speed is None and metrics.get("gait_speed", 0) > 0:
            self.baseline_gait_speed = metrics["gait_speed"]
            
        # Check gait speed deviation
        if self.baseline_gait_speed:
            current_speed = metrics.get("gait_speed", 0)
            speed_deviation = abs(current_speed - self.baseline_gait_speed) / self.baseline_gait_speed
            
            if speed_deviation > self.anomaly_config["speed_deviation_threshold"]:
                anomalies.append(self._create_gait_alert(
                    timestamp,
                    "speed_deviation",
                    f"Gait speed deviation of {speed_deviation:.2f}",
                    "warning"
                ))
                
        # Check cadence variation
        cadence_var = metrics.get("step_time_variability", 0)
        if cadence_var > self.anomaly_config["cadence_variation_threshold"]:
            anomalies.append(self._create_gait_alert(
                timestamp,
                "irregular_cadence",
                f"High step timing variability: {cadence_var:.2f}",
                "warning"
            ))
            
        return anomalies
        
    def _create_fall_alert(self, timestamp: float) -> Dict:
        """Create a fall alert dictionary.
        
        Args:
            timestamp: Time of the fall detection
            
        Returns:
            Alert dictionary
        """
        return {
            "timestamp": timestamp,
            "type": "fall",
            "message": "Possible fall detected",
            "severity": "critical",
            "details": {
                "detection_time": datetime.fromtimestamp(timestamp).isoformat(),
                "impact_magnitude": self.fall_config["impact_threshold_g"]
            }
        }
        
    def _create_gait_alert(self, timestamp: float, alert_type: str, 
                          message: str, severity: str) -> Dict:
        """Create a gait anomaly alert dictionary.
        
        Args:
            timestamp: Time of the anomaly detection
            alert_type: Type of gait anomaly
            message: Description of the anomaly
            severity: Alert severity level
            
        Returns:
            Alert dictionary
        """
        return {
            "timestamp": timestamp,
            "type": alert_type,
            "message": message,
            "severity": severity,
            "details": {
                "detection_time": datetime.fromtimestamp(timestamp).isoformat()
            }
        } 