#!/bin/bash

# Build Eleventy blog
cd blog
npm install
npm run build
cd ..

echo "Build complete!"
