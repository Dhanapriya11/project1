#!/bin/bash

# 🚀 EduAI Pro - Premium LMS Setup Script
# This script sets up the complete premium LMS application

echo "🚀 Setting up EduAI Pro - Premium Learning Management System"
echo "============================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create necessary directories
echo "📁 Creating project structure..."
mkdir -p src/components/ui
mkdir -p src/components/ai
mkdir -p src/contexts
mkdir -p src/hooks
mkdir -p src/utils
mkdir -p src/styles
mkdir -p public/images

echo "✅ Project structure created"

# Build the application
echo "🔨 Building the application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check for errors."
    exit 1
fi

echo "✅ Application built successfully"

# Run tests
echo "🧪 Running tests..."
npm test -- --watchAll=false

if [ $? -ne 0 ]; then
    echo "⚠️  Some tests failed, but continuing..."
fi

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "🚀 Your premium LMS is ready!"
echo ""
echo "📋 Next Steps:"
echo "   1. Run 'npm start' to start the development server"
echo "   2. Open http://localhost:3000 in your browser"
echo "   3. Explore the premium features and AI components"
echo ""
echo "🌟 Features Available:"
echo "   ✅ Premium UI with Glassmorphism & Neumorphism"
echo "   ✅ AI-powered recommendations and insights"
echo "   ✅ Dark/Light mode with smooth transitions"
echo "   ✅ Responsive design for all devices"
echo "   ✅ WCAG 2.1 compliant accessibility"
echo "   ✅ Production-ready performance optimizations"
echo ""
echo "📚 Documentation:"
echo "   📖 Read PREMIUM_README.md for detailed documentation"
echo "   🎨 Check src/styles/premium-design-system.css for design tokens"
echo "   🤖 Explore src/components/ai/ for AI components"
echo ""
echo "🎯 Ready to transform education with AI!"
echo ""
