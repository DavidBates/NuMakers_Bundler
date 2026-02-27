#!/bin/bash

# Script to create bundle archives from folders
# Each folder will be zipped and named as FolderName+.bbsflmt

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to the script directory
cd "$SCRIPT_DIR"

# Iterate through each directory in the current folder
for dir in */; do
    # Remove trailing slash from directory name
    dir_name="${dir%/}"
    
    # Skip if not a directory
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

echo "Bundle creation complete!"
