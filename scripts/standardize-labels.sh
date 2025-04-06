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
    
    # Topic Labels (orange hues) - Areas of the codebase/project
    create_label "$repo" "themes" "FF7700" "Theme-related changes"
    create_label "$repo" "tokens" "FF2200" "Color tokens and token system"
    create_label "$repo" "templates" "FF3300" "Template-related changes"
    create_label "$repo" "cli" "FF6600" "Command-line interface"
    create_label "$repo" "build" "FF4400" "Build system, dependencies, packaging"
    create_label "$repo" "infrastructure" "FF1100" "CI/CD, deployment, repos"
    create_label "$repo" "documentation" "FF0000" "Documentation related changes"

    # Special Visibility Labels (limited to essential cases)
    create_label "$repo" "blocked" "E11D21" "Blocked by external factors or dependencies"
    create_label "$repo" "needs-review" "369A23" "Needs detailed code review"
    create_label "$repo" "good first issue" "7057ff" "Good for newcomers"
    create_label "$repo" "help wanted" "008672" "Seeking community contributions"

    echo "Processing complete."
done

echo "Label standardization complete!"
