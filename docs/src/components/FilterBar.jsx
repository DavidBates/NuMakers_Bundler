import './FilterBar.css'

function FilterBar({ filters, filterOptions, onFilterChange, onClearFilters }) {
  const hasActiveFilters = Object.values(filters).some(v => v !== '')

  return (
    <div className="filter-bar">
      <div className="filter-controls">
        <div className="filter-row search-row">
          <div className="filter-group search-group">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search profiles..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="filter-input"
            />
          </div>
        </div>

        <div className="filter-row dropdown-row">
          <div className="filter-group">
            <label htmlFor="filamentType">Filament Type</label>
            <select
              id="filamentType"
              value={filters.filamentType}
              onChange={(e) => onFilterChange('filamentType', e.target.value)}
              className="filter-select"
            >
              <option value="">All Types</option>
              {filterOptions.filamentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="printer">Printer</label>
            <select
              id="printer"
              value={filters.printer}
              onChange={(e) => onFilterChange('printer', e.target.value)}
              className="filter-select"
            >
              <option value="">All Printers</option>
              {filterOptions.printers.map(printer => (
                <option key={printer} value={printer}>{printer}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="nozzleSize">Nozzle Size</label>
            <select
              id="nozzleSize"
              value={filters.nozzleSize}
              onChange={(e) => onFilterChange('nozzleSize', e.target.value)}
              className="filter-select"
            >
              <option value="">All Sizes</option>
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

        <div className="instructions-row">
          <div className="instructions-content">
            <h3>How to Use</h3>
            <ul>
              <li>Use filters to find profiles by filament type, printer, or nozzle size</li>
              <li>Click the download icon to get individual profiles</li>
              <li>Select multiple profiles and click "Download Selected" for a zip file</li>
              <li>Import <code>.json</code> files into Bambu Studio's filament settings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
