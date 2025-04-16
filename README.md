# GOSPL - Gait Observation System for Proactive Living

A smart slipper system for monitoring elderly gait health and fall detection.

## Overview

GOSPL is a full-stack health monitoring system that uses sensor-equipped slippers to track an elderly person's gait patterns. The system consists of two main components:

1. **Edge Application**: Python-based application that runs locally to collect and process sensor data from smart slippers
2. **Web Application**: Next.js dashboard for viewing gait data and receiving alerts

## Project Structure

```
repository-root/
├── edge-app/      # Python application for local sensor processing
└── web-app/       # Next.js web dashboard
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 18+
- Supabase account (free tier)
- Smart slipper hardware with sensors

### Setup Instructions

1. Clone this repository
2. Set up the edge application:
   ```bash
   cd edge-app
   pip install -r requirements.txt
   ```
3. Set up the web application:
   ```bash
   cd web-app
   npm install
   ```
4. Configure environment variables:
   - Copy `.env.example` to `.env.local` in web-app
   - Update Supabase credentials in both apps

## Development

- Edge App: `python edge_app.py`
- Web App: `npm run dev`

## License

MIT License - See LICENSE file for details 