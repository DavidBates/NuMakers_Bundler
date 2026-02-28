import './Header.css'

function Header({ totalProfiles, filteredCount, selectedCount, showHelp, onToggleHelp }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="brand-row">
          <div className="brand-block">
            <img
              src="/numaker-logo.webp"
              alt="Numakers Logo"
              className="logo"
            />
            <div>
              <h1><span>Numakers</span> Filament Presets</h1>
              <p className="subtitle">Select your slicer to browse and download production-ready Numakers profiles.</p>
            </div>
          </div>
          <button className="help-toggle" onClick={onToggleHelp}>
            {showHelp ? 'Hide help' : 'How to use?'}
          </button>
        </div>

        <div className="stats">
          <span>{totalProfiles} total profiles</span>
          <span>•</span>
          <span>{filteredCount} shown</span>
          <span>•</span>
          <span>{selectedCount} selected</span>
        </div>
      </div>
    </header>
  )
}

export default Header
