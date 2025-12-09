#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Building and starting Docker services (Postgres + API)..."
docker compose build
docker compose up -d

echo "✅ Backend (NestJS) running on http://localhost:3000"
echo "✅ Postgres running on localhost:5432 (db: cabincare, user: postgres, pass: postgres)"

echo
echo "👉 To start the frontend:"
echo "   cd frontend"
echo "   npm install"
echo "   npm run dev"
echo "Then open http://localhost:5173 (or the Vite URL) in your browser."
