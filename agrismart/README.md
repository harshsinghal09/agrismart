# 🌾 AgriSmart AI – Farmer Decision Assistant

An AI-powered full-stack web application that helps farmers make better decisions using Google Gemini AI.

## Features

- **Crop Advisor** – AI crop recommendations based on soil, location, and season
- **Fertilizer Planner** – Stage-wise NPK plans with cost estimates
- **Disease Detection** – Upload plant photo for instant AI diagnosis
- **AI Chat Widget** – Floating assistant for farming Q&A
- **Voice Input** – Web Speech API for hands-free input
- **Hindi / English** – Full bilingual support

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| AI | Google Gemini 1.5 Flash |
| Database | MongoDB Atlas (optional) |
| Language | ES Modules throughout |

## Quick Start

### 1. Clone / unzip the project

```bash
cd agrismart-ai
```

### 2. Backend Setup

```bash
cd server
npm install

# Create .env from example
cp .env.example .env
# Edit .env and set your GEMINI_API_KEY
```

Get a free Gemini API key at: https://aistudio.google.com/app/apikey

```bash
# Start the backend
npm run dev
# Server runs on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
# App runs on http://localhost:5173
```

Open http://localhost:5173 in your browser.

## Environment Variables

Create `server/.env`:

```env
PORT=5000
GEMINI_API_KEY=your_key_here
MONGO_URI=mongodb+srv://...    # Optional — app works without DB
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analyze` | Crop recommendations |
| POST | `/api/fertilizer` | Fertilizer plan |
| POST | `/api/disease` | Disease detection (image) |
| POST | `/api/chat` | AI chat assistant |
| GET | `/health` | Health check |

### Sample Request – Crop Analysis

```json
POST /api/analyze
{
  "soilType": "Black (Regur)",
  "location": "Maharashtra",
  "season": "Kharif (June–October)",
  "language": "en"
}
```

### Sample Response

```json
{
  "success": true,
  "data": {
    "cropSuggestions": [
      {
        "name": "Soybean",
        "variety": "JS 335",
        "expectedYield": "12-15 quintals/acre",
        "marketPrice": "₹4,200/quintal",
        "growthDuration": "95-100 days",
        "waterRequirement": "medium",
        "suitability": "94"
      }
    ],
    "bestSeason": "June 15 – July 15",
    "soilPreparation": "Deep ploughing 2-3 weeks before sowing",
    "weatherRisk": "Excess rain in August can cause waterlogging",
    "confidence": "92%",
    "tips": ["Treat seeds with Rhizobium culture", "Maintain 45cm row spacing"]
  }
}
```

## Project Structure

```
agrismart-ai/
├── server/
│   ├── controllers/       # Business logic
│   ├── routes/            # API route definitions
│   ├── services/          # Gemini AI service
│   ├── models/            # Mongoose schemas
│   ├── middleware/        # Error handling
│   └── index.js           # Express entry point
│
└── client/
    └── src/
        ├── components/    # Navbar, ChatWidget, etc.
        ├── pages/         # Home, CropTool, Fertilizer, Disease, About
        ├── context/       # Language context (EN/HI)
        └── services/      # Axios API client
```

## Notes

- MongoDB is **optional** — the app works fully without it (queries won't be saved)
- The Gemini API key is **server-side only** — never exposed to the browser
- Disease detection sends the image as base64 to your own server, which calls Gemini Vision
