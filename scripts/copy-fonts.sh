#!/bin/bash

echo "Setting up dist directory with fonts..."

# Create dist and fonts directories
mkdir -p dist/fonts

# Copy font files
cp stories/fonts/*.woff dist/fonts/ 2>/dev/null
cp stories/fonts/*.woff2 dist/fonts/ 2>/dev/null

# List what was copied
echo "Font files in dist/fonts:"
ls -la dist/fonts/

echo "Font copy complete!"