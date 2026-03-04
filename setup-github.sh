#!/bin/bash
# ═══════════════════════════════════════════════════════════
# English Mastery Hub — GitHub Setup Script
# Yamazing Corp
# ═══════════════════════════════════════════════════════════
#
# USAGE:
#   chmod +x setup-github.sh
#   ./setup-github.sh
#
# PREREQUISITES:
#   - Git installed
#   - GitHub CLI (gh) installed: https://cli.github.com/
#   - Authenticated: gh auth login
# ═══════════════════════════════════════════════════════════

set -e

# Configuration — EDIT THESE
REPO_NAME="english-mastery-hub"
REPO_DESCRIPTION="AI-powered professional English learning platform by Yamazing Corp"
VISIBILITY="public"  # or "private"

echo ""
echo "═══════════════════════════════════════════════════"
echo "  English Mastery Hub — GitHub Setup"
echo "  Yamazing Corp"
echo "═══════════════════════════════════════════════════"
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) not found."
    echo "   Install: https://cli.github.com/"
    echo ""
    echo "   Alternative — manual commands:"
    echo "   1. Create repo at: https://github.com/new"
    echo "   2. Name: $REPO_NAME"
    echo "   3. Then run:"
    echo "      git remote add origin https://github.com/YOUR_USERNAME/$REPO_NAME.git"
    echo "      git push -u origin main"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "⚠️  Not authenticated. Running: gh auth login"
    gh auth login
fi

# Get current GitHub username
GH_USER=$(gh api user --jq '.login')
echo "✓ Authenticated as: $GH_USER"

# Check if we're in a git repo
if [ ! -d ".git" ]; then
    echo "⚙️  Initializing git repository..."
    git init
    git add -A
    git commit -m "feat: initial release — English Mastery Hub v1.0.0"
    git branch -M main
fi

# Create GitHub repository
echo "⚙️  Creating GitHub repository: $GH_USER/$REPO_NAME"
gh repo create "$REPO_NAME" \
    --description "$REPO_DESCRIPTION" \
    --"$VISIBILITY" \
    --source=. \
    --remote=origin \
    --push

echo ""
echo "═══════════════════════════════════════════════════"
echo "  ✅ Done! Repository created and pushed."
echo ""
echo "  🔗 https://github.com/$GH_USER/$REPO_NAME"
echo "═══════════════════════════════════════════════════"
echo ""
