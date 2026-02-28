#!/bin/bash

# Script to create bundle archives from folders
# Each folder will be zipped and named as FolderName+.bbsflmt

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to the script directory
cd "$SCRIPT_DIR"

# Iterate through each directory starting with "Numakers"
for dir in Numakers*/; do
    # Remove trailing slash from directory name
    dir_name="${dir%/}"
    
    # Skip if not a directory or doesn't exist
    if [ ! -d "$dir_name" ]; then
        continue
    fi
    
    # Create the output filename
    output_file="${dir_name}.bbsflmt"
    
    echo "Creating bundle: $output_file from folder: $dir_name"
    
    # Create zip archive
    # Using -r for recursive, -q for quiet mode
    zip -r "$output_file" "$dir_name"
    
    if [ $? -eq 0 ]; then
        echo "✓ Successfully created: $output_file"
    else
        echo "✗ Failed to create: $output_file"
    fi
done

# Copy JSON profile files to docs/public for the web app
if [ -d "docs/public" ]; then
    echo "Copying profile files to docs/public..."
    for dir in Numakers*/; do
        dir_name="${dir%/}"
        if [ -d "$dir_name/Numakers" ]; then
            mkdir -p "docs/public/$dir_name/Numakers"
            cp "$dir_name/Numakers/"*.json "docs/public/$dir_name/Numakers/" 2>/dev/null
        fi
    done
    echo "✓ Profile files copied to docs/public"
fi

echo "Bundle creation complete!"
