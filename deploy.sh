#!/bin/bash
# Deploy script for portfolio_personal
# Stages all changes, commits with a message, and pushes to main to trigger GitHub Pages deployment.
git add .
git commit -m "Update portfolio"
git push origin main

echo "Deployed to https://alvaromerinop.github.io/portfolio_personal"
