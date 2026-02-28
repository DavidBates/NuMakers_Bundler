# Numakers Profile Viewer

React + Vite web application for browsing and downloading Numakers filament profiles.

## Features

- Interactive table view of all available profiles
- Filter by filament type, printer model, nozzle size, or search keyword
- Sort by any column
- Download individual profiles or select multiple for batch download
- Fully responsive design (desktop, tablet, mobile)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Data Generation

Profile data is automatically generated from the parent directory's profile JSON files:

```bash
# From project root
node generate_bundle_data.js
```

This creates `src/profiles.json` with metadata extracted from all `Numakers*/Numakers/*.json` files.

## Deployment

The app is automatically built and deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

## Structure

```
docs/
├── public/           # Static assets and copied profile files
├── src/
│   ├── components/   # React components
│   │   ├── Header.jsx
│   │   ├── FilterBar.jsx
│   │   ├── ProfileTable.jsx
│   │   └── Footer.jsx
│   ├── profiles.json # Generated profile metadata
│   ├── App.jsx       # Main application component
│   └── main.jsx      # Application entry point
└── index.html        # HTML template
```
