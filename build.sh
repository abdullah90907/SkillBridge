#!/bin/bash

# Vercel build script for SkillBridge
echo "Starting SkillBridge build process..."

# Navigate to frontend directory and build
cd frontend
echo "Installing frontend dependencies..."
npm ci --silent

echo "Building React frontend..."
npm run build

echo "Build completed successfully!"