#!/usr/bin/env node

/**
 * Script to generate profile data for the web app
 * Reads all .json profile files and extracts metadata
 */

const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const outputFile = path.join(rootDir, 'docs', 'src', 'profiles.json');

// Find all directories starting with 'Numakers'
const bundleDirs = fs.readdirSync(rootDir)
  .filter(file => {
    const fullPath = path.join(rootDir, file);
    return fs.statSync(fullPath).isDirectory() && file.startsWith('Numakers');
  });

const profiles = [];

// Helper function to convert folder name to friendly filament type
function getFriendlyFilamentType(folderName) {
  // Remove "Numakers" prefix
  const type = folderName.replace(/^Numakers/, '');
  
  // Handle special cases
  if (type === 'PETGHS') return 'PETG HS';
  if (type === 'PLACF') return 'PLA-CF';
  if (type === 'PLAMatte') return 'PLA Matte';
  if (type === 'PLAWood') return 'PLA Wood';
  if (type === 'PLASilk') return 'PLA Silk';
  if (type === 'PLA+') return 'PLA+';
  
  // Default: return as-is (ABS, ASA, etc.)
  return type;
}

bundleDirs.forEach(dir => {
  const numakersDir = path.join(rootDir, dir, 'Numakers');
  
  if (fs.existsSync(numakersDir) && fs.statSync(numakersDir).isDirectory()) {
    const jsonFiles = fs.readdirSync(numakersDir)
      .filter(file => file.endsWith('.json'));
    
    jsonFiles.forEach(file => {
      const filePath = path.join(numakersDir, file);
      
      try {
        const profileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Extract metadata from filename
        // Format: "Numakers [Type] @[Printer] [Nozzle].json"
        const match = file.match(/Numakers\s+.+?\s+@(.+?)\s+(\d+\.\d+)\s+nozzle\.json/i);
        
        if (match) {
          const [, printer, nozzleSize] = match;
          
          // Derive filament type from folder name for consistent display
          const filamentType = getFriendlyFilamentType(dir);
          
          profiles.push({
            id: `${dir}-${file.replace(/\s+/g, '-').replace('.json', '')}`,
            fileName: file,
            filePath: `${dir}/Numakers/${file}`,
            filamentType: filamentType,
            filamentName: profileData.name || filamentType,
            printer: printer.trim(),
            nozzleSize: `${nozzleSize}mm`,
            vendor: profileData.filament_vendor?.[0] || 'Numakers',
            type: profileData.filament_type?.[0] || filamentType,
            folder: dir
          });
        }
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    });
  }
});

// Sort profiles by filament type, then printer
profiles.sort((a, b) => {
  const typeCompare = a.filamentType.localeCompare(b.filamentType);
  if (typeCompare !== 0) return typeCompare;
  return a.printer.localeCompare(b.printer);
});

// Write to output file
fs.writeFileSync(outputFile, JSON.stringify(profiles, null, 2));

console.log(`✓ Generated profile data: ${profiles.length} profiles found`);
console.log(`✓ Output written to: ${outputFile}`);

// Generate unique values for filters
const filamentTypes = [...new Set(profiles.map(p => p.filamentType))].sort();
const printers = [...new Set(profiles.map(p => p.printer))].sort();
const nozzleSizes = [...new Set(profiles.map(p => p.nozzleSize))].sort();

console.log(`\nFilters available:`);
console.log(`  Filament Types: ${filamentTypes.length}`);
console.log(`  Printers: ${printers.length}`);
console.log(`  Nozzle Sizes: ${nozzleSizes.length}`);
