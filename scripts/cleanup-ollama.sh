#!/bin/bash

echo "Cleaning up ollama processes..."

# Kill any running ollama processes
pkill -9 ollama

# Kill any processes using port 11434 (ollama's default port)
lsof -ti:11434 | xargs kill -9 2>/dev/null || true

# Remove any leftover ollama files
rm -rf ~/.ollama/logs/*
rm -rf ~/.ollama/tmp/*

echo "Cleanup complete!"

# Verify no ollama processes are running
if pgrep ollama > /dev/null; then
    echo "Warning: Some ollama processes are still running:"
    ps aux | grep ollama
else
    echo "All ollama processes have been terminated"
fi 