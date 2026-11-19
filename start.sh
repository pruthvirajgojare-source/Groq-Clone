#!/bin/bash
cd "$(dirname "$0")"
echo "Starting Groq Clone server..."
npx vite --open --port 3000
