#!/bin/bash

# Portfolio Deployment Script
# This script helps deploy the portfolio to GitHub Pages manually

set -e

echo "🚀 Portfolio Deployment Script"
echo "==============================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the portfolio root directory."
    exit 1
fi

# Check if git is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: You have uncommitted changes. Please commit them first."
    git status --short
    exit 1
fi

echo "📦 Installing dependencies..."
npm ci

echo "🔍 Running linting..."
npm run lint

echo "🏗️  Building the project..."
npm run build

echo "✅ Build completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Push your changes to the main branch:"
echo "   git push origin main"
echo ""
echo "2. The GitHub Actions workflow will automatically deploy to:"
echo "   https://meet1785.github.io/portfolio/"
echo ""
echo "3. Or manually trigger deployment from GitHub Actions tab"
echo ""
echo "🎉 Portfolio is ready for deployment!"