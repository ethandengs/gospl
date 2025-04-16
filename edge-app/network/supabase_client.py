import aiohttp
import json
import logging
from typing import Dict, List
from datetime import datetime

logger = logging.getLogger("GOSPL.network")

class SupabaseClient:
    """Client for communicating with Supabase backend."""
    
    def __init__(self, url: str, key: str, user_id: str):
        """Initialize the Supabase client.
        
        Args:
            url: Supabase project URL
            key: Supabase API key (anon or service role)
            user_id: User ID for the elder
        """
        self.base_url = url.rstrip('/')
        self.key = key
        self.user_id = user_id
        
        # Headers for Supabase REST API
        self.headers = {
            'apikey': key,
            'Authorization': f'Bearer {key}',
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'  # Don't return the inserted/updated records
        }
        
    async def send_alert(self, alert: Dict) -> None:
        """Send an alert to the cloud.
        
        Args:
            alert: Alert data dictionary
        """
        # Add user ID and format timestamp
        alert_data = {
            **alert,
            "user_id": self.user_id,
            "created_at": datetime.fromtimestamp(alert["timestamp"]).isoformat()
        }
        
        # Remove raw timestamp as Supabase will use created_at
        alert_data.pop("timestamp", None)
        
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{self.base_url}/rest/v1/alerts",
                    headers=self.headers,
                    json=alert_data
                ) as response:
                    if response.status not in (200, 201):
                        error_text = await response.text()
                        logger.error(f"Failed to send alert: {error_text}")
                        raise Exception(f"Alert API error: {response.status}")
                        
                    logger.info(f"Successfully sent alert: {alert['type']}")
                    
        except Exception as e:
            logger.error(f"Error sending alert to Supabase: {e}")
            raise
            
    async def upload_gait_data(self, data: List[Dict]) -> None:
        """Upload processed gait data to the cloud.
        
        Args:
            data: List of gait data records
        """
        if not data:
            return
            
        # Format data for upload
        records = []
        for record in data:
            formatted_record = {
                "user_id": self.user_id,
                "created_at": datetime.fromtimestamp(record["timestamp"]).isoformat(),
                "metrics": json.dumps({
                    k: v for k, v in record.items()
                    if k not in ("timestamp", "user_id", "created_at")
                })
            }
            records.append(formatted_record)
            
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{self.base_url}/rest/v1/gait_data",
                    headers=self.headers,
                    json=records
                ) as response:
                    if response.status not in (200, 201):
                        error_text = await response.text()
                        logger.error(f"Failed to upload gait data: {error_text}")
                        raise Exception(f"Gait data API error: {response.status}")
                        
                    logger.info(f"Successfully uploaded {len(records)} gait records")
                    
        except Exception as e:
            logger.error(f"Error uploading gait data to Supabase: {e}")
            raise
            
    async def get_config(self) -> Dict:
        """Get configuration from the cloud.
        
        Returns:
            Dictionary of configuration values
        """
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    f"{self.base_url}/rest/v1/user_config",
                    headers=self.headers,
                    params={"user_id": f"eq.{self.user_id}", "select": "*"}
                ) as response:
                    if response.status != 200:
                        error_text = await response.text()
                        logger.error(f"Failed to get config: {error_text}")
                        raise Exception(f"Config API error: {response.status}")
                        
                    config = await response.json()
                    return config[0] if config else {}
                    
        except Exception as e:
            logger.error(f"Error getting config from Supabase: {e}")
            raise 