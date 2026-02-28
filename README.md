# Numakers Filament Profiles for Bambu Lab

This repository contains filament profiles for Numakers filaments, optimized for various Bambu Lab printers.

## Creating Bundles

To create `.bbsflmt` bundle files for importing into Bambu Studio or Bambu Handy:

```bash
chmod +x ./create_bundles.sh
./create_bundles.sh
```

This will create bundle files from each folder with the naming pattern `FolderName+.bbsflmt`.

## Downloading Profiles

### Web App (Recommended)

Visit the [web app](https://yourusername.github.io/NuMakers_Bundler/) to:
- Browse all available profiles with an interactive table
- Filter by filament type, printer model, and nozzle size
- Download individual profiles as `.json` files
- Select multiple profiles and download as a single `.zip` file

### GitHub Releases

Pre-built `.bbsflmt` bundle files are automatically generated and attached to each [GitHub release](../../releases) for batch importing into Bambu Studio or Bambu Handy.

## Installing Profiles

### Option 1: Web App (Recommended)

1. Visit the [web app](https://yourusername.github.io/NuMakers_Bundler/)
2. Use filters to find the profiles you need
3. Download individual `.json` files or select multiple and download as a zip
4. In Bambu Studio, go to Filament settings and import the downloaded `.json` files

### Option 2: Bundle Files from Releases

1. Visit the [Releases page](../../releases)
2. Download the `.bbsflmt` bundle files from the latest release
3. Open Bambu Studio or Bambu Handy app
4. Import the downloaded bundle files (imports all profiles for that filament type)

### Option 3: Build from Source

1. Clone this repository
2. Run the bundle creation script to generate `.bbsflmt` files:
   ```bash
   chmod +x ./create_bundles.sh
   ./create_bundles.sh
   ```
3. Import the generated bundle files into Bambu Studio

## Web App Features

The interactive web application provides:

- **Advanced Filtering**: Search and filter profiles by filament type, printer model, nozzle size
- **Sortable Table**: Click column headers to sort profiles
- **Individual Downloads**: Download any single profile with one click
- **Batch Downloads**: Select multiple profiles and download as a `.zip` file
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Stats**: See total profiles available and current filter results

## Contributing New Profiles

Want to add a new filament profile for a different printer or nozzle size? Follow these steps:

### 1. Create the Profile in Bambu Studio

1. Open Bambu Studio
2. Go to the Filament settings
3. Select one of the existing Numakers profiles as a base
4. Create a new profile by duplicating it
5. Modify the printer/nozzle settings as needed for your target configuration

### 2. Perform Required Calibration

Before submitting a new profile, you **must** perform the following calibrations:

- **Flow Rate Calibration**: [Bambu Lab Flow Rate Calibration Guide](https://wiki.bambulab.com/en/software/bambu-studio/calibration_flow_rate)
- **Pressure Advance Calibration**: [Bambu Lab PA Calibration Guide](https://wiki.bambulab.com/en/software/bambu-studio/calibration_pa)

These calibrations ensure the profile is properly tuned for optimal print quality.

### 3. Export and Place the Profile

1. Export your calibrated profile from Bambu Studio as a `.json` file
2. Name it following the pattern: `Numakers [Filament Type] @[Printer Model] [Nozzle Size].json`
   - Example: `Numakers PLA + @Bambu Lab A1 0.4 nozzle.json`
3. Place the file in the appropriate folder:

### 4. Update bundle_structure.json

Open the `bundle_structure.json` file in the same folder as your profile and add your new profile path to the `filament_path` array:

```json
{
    "filament_path": [
        "Numakers/Numakers PLA + @Bambu Lab A1 0.4 nozzle.json",
        "Numakers/Your New Profile.json"
    ]
}
```

### 5. Test the Bundle Creation

Run the bundle creation script to ensure everything works:

```bash
./create_bundles.sh
```

If successful, you should see a new or updated `.bbsflmt` file created. Test importing this bundle into Bambu Studio to verify it works correctly.

### 6. Submit Your Contribution

Once tested, submit a pull request with:
- Your new profile JSON file
- Updated `bundle_structure.json`
- A description of what printer/nozzle configuration you've added

## Development

### Web App

The repository includes a React + Vite web app in the `docs/` folder that provides an interactive interface for browsing and downloading filament profiles.

#### Local Development

```bash
cd docs
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

#### Building for Production

The web app is automatically built and deployed to GitHub Pages when changes are pushed to the main branch. To build manually:

```bash
cd docs
npm run build
```

The build output will be in `docs/dist/`

### Updating Bundle Data

The web app reads profile information from `profiles.json`. This file is automatically generated from the individual profile `.json` files during the build process. To regenerate manually:

```bash
node generate_bundle_data.js
```

This script:
- Scans all `Numakers*/Numakers/` directories for `.json` profile files
- Extracts metadata (filament type, printer, nozzle size) from filenames and file content
- Generates `docs/src/profiles.json` for the web app

## License

These profiles are provided as-is for use with Numakers filaments on Bambu Lab printers.
