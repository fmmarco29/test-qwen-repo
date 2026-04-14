#!/bin/bash
set -e

echo "Setting up project..."

# Create virtual environment
python -m venv .venv
source .venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -e ".[dev]"

echo "Setup complete! Run 'make help' to see available commands."
