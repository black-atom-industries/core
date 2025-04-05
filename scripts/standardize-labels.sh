#!/bin/bash
# Standardize labels across Black Atom repositories

set -e
echo "Standardizing labels across Black Atom repositories..."

# List of repositories
REPOS=("core" "nvim" "zed" "ghostty" "wezterm" "obsidian" "adapter-template")

# Function to create or update a label
create_or_update_label() {
    local repo=$1
    local label=$2
    local color=$3
    local description=$4
    
    # Check if label exists
    if gh label list -R "black-atom-industries/$repo" | grep -q "^$label"; then
        echo "Updating label '$label' in $repo..."
        gh label edit "$label" --description "$description" --color "$color" -R "black-atom-industries/$repo"
    else
        echo "Creating label '$label' in $repo..."
        gh label create "$label" --description "$description" --color "$color" -R "black-atom-industries/$repo"
    fi
}

# Process each repository
for repo in "${REPOS[@]}"; do
    echo "Processing repository: $repo"
    
    # Common labels for all repositories
    create_or_update_label "$repo" "bug" "d73a4a" "Something isn't working"
    create_or_update_label "$repo" "bugfix" "A0EDB0" "Fixes for bugs"
    create_or_update_label "$repo" "enhancement" "a2eeef" "New feature or request"
    create_or_update_label "$repo" "feature" "a2eeef" "New functionality"
    create_or_update_label "$repo" "documentation" "0075ca" "Improvements or additions to documentation"
    create_or_update_label "$repo" "refactor" "AEA320" "Code refactoring without functional changes"
    create_or_update_label "$repo" "needs-review" "369A23" "Needs detailed code review"
    create_or_update_label "$repo" "optimization" "5F609E" "Performance or efficiency improvements"
    
    # Handle the good first issue label
    # First update the standard GitHub label with our color
    create_or_update_label "$repo" "good first issue" "7057ff" "Good for newcomers"
    
    # Delete redundant labels if they exist
    if gh label list -R "black-atom-industries/$repo" | grep -q "^good-first-issue"; then
        echo "Deleting redundant label 'good-first-issue' in $repo..."
        gh label delete "good-first-issue" -R "black-atom-industries/$repo" --yes
    fi
    
    # Fix "needs review" vs "needs-review" issue
    if gh label list -R "black-atom-industries/$repo" | grep -q "^needs review"; then
        echo "Deleting redundant label 'needs review' in $repo..."
        gh label delete "needs review" -R "black-atom-industries/$repo" --yes
    fi
done

echo "Label standardization complete!"
