import numpy as np
from typing import Dict, List
from collections import deque
import logging

logger = logging.getLogger("GOSPL.processing")

class DataProcessor:
    """Process raw sensor data into features for gait analysis."""
    
    def __init__(self, window_size: int = 100):
        """Initialize the data processor.
        
        Args:
            window_size: Number of samples to keep in sliding window
        """
        self.window_size = window_size
        
        # Sliding windows for each sensor type
        self.acc_window = deque(maxlen=window_size)
        self.gyro_window = deque(maxlen=window_size)
        self.pressure_window = deque(maxlen=window_size)
        
        # Cache for processed data
        self.cached_data = []
        
    def process(self, raw_data: Dict) -> Dict:
        """Process incoming sensor data.
        
        Args:
            raw_data: Dictionary containing sensor readings
            
        Returns:
            Dictionary of processed features
        """
        data_type = raw_data["type"]
        timestamp = raw_data["timestamp"]
        
        if data_type == "accelerometer":
            return self._process_accelerometer(raw_data["data"], timestamp)
        elif data_type == "gyroscope":
            return self._process_gyroscope(raw_data["data"], timestamp)
        elif data_type == "pressure":
            return self._process_pressure(raw_data["data"], timestamp)
        else:
            logger.warning(f"Unknown data type: {data_type}")
            return {}
            
    def _process_accelerometer(self, data: Dict, timestamp: float) -> Dict:
        """Process accelerometer data.
        
        Args:
            data: Dictionary with ax, ay, az values
            timestamp: Time of measurement
            
        Returns:
            Processed features from accelerometer
        """
        # Add to sliding window
        self.acc_window.append((timestamp, data))
        
        # Convert recent window to numpy array for processing
        if len(self.acc_window) < 2:
            return {}
            
        recent_data = np.array([[d["ax"], d["ay"], d["az"]] 
                               for _, d in self.acc_window])
        
        # Calculate features
        resultant = np.sqrt(np.sum(recent_data**2, axis=1))
        
        features = {
            "timestamp": timestamp,
            "acc_magnitude": float(resultant[-1]),
            "acc_mean": float(np.mean(resultant)),
            "acc_std": float(np.std(resultant)),
            "vertical_acceleration": float(recent_data[-1, 1])  # Assuming y is vertical
        }
        
        return features
        
    def _process_gyroscope(self, data: Dict, timestamp: float) -> Dict:
        """Process gyroscope data.
        
        Args:
            data: Dictionary with gx, gy, gz values
            timestamp: Time of measurement
            
        Returns:
            Processed features from gyroscope
        """
        # Add to sliding window
        self.gyro_window.append((timestamp, data))
        
        if len(self.gyro_window) < 2:
            return {}
            
        recent_data = np.array([[d["gx"], d["gy"], d["gz"]] 
                               for _, d in self.gyro_window])
        
        # Calculate angular velocity features
        angular_velocity = np.sqrt(np.sum(recent_data**2, axis=1))
        
        features = {
            "timestamp": timestamp,
            "angular_velocity": float(angular_velocity[-1]),
            "angular_velocity_mean": float(np.mean(angular_velocity)),
            "rotation_y": float(recent_data[-1, 1])  # Sagittal plane rotation
        }
        
        return features
        
    def _process_pressure(self, data: Dict, timestamp: float) -> Dict:
        """Process pressure sensor data.
        
        Args:
            data: Dictionary with pressure values
            timestamp: Time of measurement
            
        Returns:
            Processed features from pressure sensors
        """
        # Add to sliding window
        self.pressure_window.append((timestamp, data))
        
        if len(self.pressure_window) < 2:
            return {}
            
        pressures = np.array(data["pressures"])
        
        # Calculate pressure distribution features
        total_pressure = np.sum(pressures)
        max_pressure = np.max(pressures)
        pressure_ratio = np.max(pressures) / (np.mean(pressures) + 1e-6)
        
        features = {
            "timestamp": timestamp,
            "total_pressure": float(total_pressure),
            "max_pressure": float(max_pressure),
            "pressure_ratio": float(pressure_ratio)
        }
        
        return features
        
    def get_cached_data(self) -> List[Dict]:
        """Get cached processed data for upload.
        
        Returns:
            List of processed data records
        """
        data = self.cached_data.copy()
        self.cached_data = []  # Clear cache after retrieval
        return data 