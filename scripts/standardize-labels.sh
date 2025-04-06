#!/bin/bash
# Standardize labels across Black Atom repositories

set -e
echo "Standardizing labels across Black Atom repositories..."

# Dynamically fetch repositories
echo "Fetching repositories from black-atom-industries..."
REPOS=($(gh repo list black-atom-industries --json name --jq '.[].name'))

echo "Found ${#REPOS[@]} repositories: ${REPOS[*]}"

delete_labels() {
    local repo=$1

    # Get labels one per line
    gh label list --repo "black-atom-industries/$repo" --json name --jq '.[] | .name' | while read -r label; do
        echo "Deleting existing label '$label' in $repo..."
        gh label delete "$label" --repo "black-atom-industries/$repo" --yes
    done
    echo "All existing labels deleted."
}

# Function to create or update a label
create_label() {
    local repo=$1
    local label=$2
    local color=$3
    local description=$4

    # Create the label
    echo "Creating label '$label' in $repo..."
    gh label create "$label" --description "$description" --color "$color" -R "black-atom-industries/$repo"
}

# Process each repository
for repo in "${REPOS[@]}"; do
    echo "Processing repository: $repo"

    # delete all existing labels
    delete_labels "$repo"
    
    # Common labels for all repositories
    create_label "$repo" "feature" "a2eeef" "New feature or request"
    create_label "$repo" "refactor" "AEA320" "Code refactoring without functional changes"
    create_label "$repo" "optimization" "5F609E" "Performance or efficiency improvements"
    create_label "$repo" "documentation" "0075ca" "Improvements or additions to documentation"
    create_label "$repo" "bug" "d73a4a" "Something isn't working"
    create_label "$repo" "bugfix" "A0EDB0" "Fixes for bugs"
    create_label "$repo" "needs-review" "369A23" "Needs detailed code review"
    create_label "$repo" "good first issue" "7057ff" "Good for newcomers"

    echo "Processing complete."
done

echo "Label standardization complete!"
