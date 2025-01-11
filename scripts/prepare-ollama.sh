#!/bin/bash

# Create directories if they don't exist
mkdir -p resources/ollama

# Copy ollama to llm
cp /Applications/Ollama.app/Contents/MacOS/ollama resources/ollama/llm

# Set proper permissions
chmod 755 resources/ollama/llm

# Verify the copy
if [ -f resources/ollama/llm ]; then
    echo "Successfully copied ollama to resources/ollama/llm"
    ls -l resources/ollama/llm
else
    echo "Failed to copy ollama"
    exit 1
fi 