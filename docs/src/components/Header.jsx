import './Header.css'

function Header({ totalProfiles, filteredCount, selectedCount }) {
  return (
    <header className="header">
      <div className="header-content">
        <img 
          src="/numaker-logo.webp" 
          alt="Numakers Logo" 
          className="logo"
        />
        <h1>Numakers Filament Presets</h1>
        <p className="subtitle">Browse and download individual profiles for Bambu Lab printers</p>
        <div className="stats">
          <span>{totalProfiles} total profiles</span>
          <span>•</span>
          <span>{filteredCount} matching filters</span>
          {selectedCount > 0 && (
            <>
              <span>•</span>
              <span className="selected-count">{selectedCount} selected</span>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
