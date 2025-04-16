import numpy as np
from typing import Dict, List, Optional, Tuple
import logging

logger = logging.getLogger("GOSPL.gait")

class GaitAnalyzer:
    """Analyze gait patterns from processed sensor data."""
    
    def __init__(self, config: Dict):
        """Initialize the gait analyzer.
        
        Args:
            config: Configuration dictionary with analysis parameters
        """
        self.config = config
        self.step_config = config["step_detection"]
        
        # State for step detection
        self.last_step_time: Optional[float] = None
        self.steps_buffer: List[Tuple[float, float]] = []  # (timestamp, magnitude)
        self.stride_lengths: List[float] = []
        
    def analyze(self, processed_data: Dict) -> Dict:
        """Analyze processed sensor data for gait patterns.
        
        Args:
            processed_data: Dictionary of processed sensor features
            
        Returns:
            Dictionary of gait metrics
        """
        if not processed_data:
            return {}
            
        timestamp = processed_data.get("timestamp")
        if not timestamp:
            return {}
            
        # Detect steps from vertical acceleration and pressure
        step_detected = self._detect_step(
            timestamp,
            processed_data.get("vertical_acceleration", 0),
            processed_data.get("total_pressure", 0)
        )
        
        if step_detected:
            # Update gait metrics when a step is detected
            metrics = self._compute_gait_metrics(timestamp)
        else:
            # Return current state without updates
            metrics = self._get_current_metrics()
            
        return metrics
        
    def _detect_step(self, timestamp: float, vert_acc: float, pressure: float) -> bool:
        """Detect if a step has occurred based on sensor data.
        
        Args:
            timestamp: Current timestamp
            vert_acc: Vertical acceleration
            pressure: Total pressure reading
            
        Returns:
            True if a step is detected
        """
        # Check if acceleration exceeds threshold
        if abs(vert_acc) < self.step_config["acc_threshold_g"]:
            return False
            
        # Check minimum time between steps
        if self.last_step_time is not None:
            time_since_last = timestamp - self.last_step_time
            if time_since_last < self.step_config["min_step_interval_ms"] / 1000:
                return False
                
        # Confirm with pressure reading (should be high during foot strike)
        if pressure < 0.5:  # Arbitrary threshold, would be calibrated
            return False
            
        # Step detected
        self.last_step_time = timestamp
        self.steps_buffer.append((timestamp, abs(vert_acc)))
        
        # Keep only recent steps
        while (self.steps_buffer and 
               timestamp - self.steps_buffer[0][0] > self.config["window_size_s"]):
            self.steps_buffer.pop(0)
            
        return True
        
    def _compute_gait_metrics(self, current_time: float) -> Dict:
        """Compute gait metrics when a new step is detected.
        
        Args:
            current_time: Current timestamp
            
        Returns:
            Dictionary of gait metrics
        """
        if len(self.steps_buffer) < 2:
            return self._get_current_metrics()
            
        # Calculate step timing metrics
        step_times = np.diff([t for t, _ in self.steps_buffer])
        cadence = 60 / np.mean(step_times)  # steps per minute
        
        # Calculate variability
        step_time_variability = np.std(step_times) / np.mean(step_times)
        
        # Estimate stride length (could be more sophisticated with actual measurements)
        # Here we use a simple model based on step timing and acceleration magnitude
        step_accels = [m for _, m in self.steps_buffer]
        estimated_stride = 0.5 * np.mean(step_accels) * np.mean(step_times)**2
        self.stride_lengths.append(estimated_stride)
        
        # Calculate gait speed
        gait_speed = estimated_stride * cadence / 120  # meters per second
        
        # Prepare metrics dictionary
        metrics = {
            "timestamp": current_time,
            "cadence": float(cadence),
            "step_time_variability": float(step_time_variability),
            "estimated_stride_length": float(estimated_stride),
            "gait_speed": float(gait_speed),
            "steps_in_window": len(self.steps_buffer)
        }
        
        return metrics
        
    def _get_current_metrics(self) -> Dict:
        """Get current gait metrics without updates.
        
        Returns:
            Dictionary of current gait metrics
        """
        if not self.steps_buffer:
            return {}
            
        # Return last known values
        last_metrics = {
            "timestamp": self.steps_buffer[-1][0],
            "cadence": 0.0,
            "step_time_variability": 0.0,
            "estimated_stride_length": 0.0,
            "gait_speed": 0.0,
            "steps_in_window": len(self.steps_buffer)
        }
        
        return last_metrics 