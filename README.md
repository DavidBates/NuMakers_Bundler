# Numakers Filament Profiles for Bambu Lab

This repository contains filament profiles for Numakers PLA and PLA Silk filaments, optimized for various Bambu Lab printers.

## Creating Bundles

To create `.bbsflmt` bundle files for importing into Bambu Studio or Bambu Handy:

```bash
chmod +x ./create_bundles.sh
./create_bundles.sh
```

This will create bundle files from each folder with the naming pattern `FolderName+.bbsflmt`.

## Installing Profiles

1. Run the bundle creation script to generate `.bbsflmt` files
2. Open Bambu Studio or use Bambu Handy app
3. Import the generated `.bbsflmt` bundle files

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

## License

These profiles are provided as-is for use with Numakers filaments on Bambu Lab printers.
