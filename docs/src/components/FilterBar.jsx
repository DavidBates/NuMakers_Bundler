import './FilterBar.css'

function FilterBar({ filters, filterOptions, onFilterChange, onClearFilters, showHelp }) {
  const hasActiveFilters = Object.values(filters).some(v => v !== '')

  return (
    <div className="filter-bar">
      <div className="filter-panel slicer-panel">
        <div className="filter-group">
          <label htmlFor="slicer">Select your slicer</label>
          <select
            id="slicer"
            value={filters.slicer}
            onChange={(e) => onFilterChange('slicer', e.target.value)}
            className="filter-select"
          >
            {filterOptions.slicers.map(slicer => (
              <option key={slicer} value={slicer}>{slicer}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-panel">
        <div className="filter-row">
          <div className="filter-group search-group">
            <label htmlFor="search">Search preset</label>
            <input
              id="search"
              type="text"
              placeholder="Filament, printer, or filename..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="filter-input"
            />
          </div>
        </div>

        <div className="filter-row dropdown-row">
          <div className="filter-group">
            <label htmlFor="filamentType">Series</label>
            <select
              id="filamentType"
              value={filters.filamentType}
              onChange={(e) => onFilterChange('filamentType', e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              {filterOptions.filamentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="printer">Printer brand/model</label>
            <select
              id="printer"
              value={filters.printer}
              onChange={(e) => onFilterChange('printer', e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              {filterOptions.printers.map(printer => (
                <option key={printer} value={printer}>{printer}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="nozzleSize">Nozzle size</label>
            <select
              id="nozzleSize"
              value={filters.nozzleSize}
              onChange={(e) => onFilterChange('nozzleSize', e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              {filterOptions.nozzleSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="btn-clear-filters"
              title="Clear all filters"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {showHelp && (
        <div className="instructions-row">
          <h3>How to use</h3>
          <ul>
            <li>Pick your slicer and filter by series/printer/nozzle size.</li>
            <li>Expand a material row to reveal downloadable JSON presets.</li>
            <li>Select rows, then click <strong>Download Selected</strong> for a ZIP bundle.</li>
            <li>Import JSON in your slicer's filament/profile management screen.</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default FilterBar
