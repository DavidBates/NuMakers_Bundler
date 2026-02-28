import './BundleCard.css'

function BundleCard({ bundle }) {
  const handleDownload = () => {
    // For GitHub Pages, files should be in the same directory as the app
    window.location.href = `/${bundle.fileName}`
  }

  return (
    <div className="bundle-card">
      <div className="bundle-header">
        <h3>{bundle.name}</h3>
        <span className="profile-count">{bundle.profileCount} profiles</span>
      </div>
      <div className="bundle-details">
        <p className="version">Version: {bundle.version}</p>
      </div>
      <button 
        className="download-button"
        onClick={handleDownload}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download Bundle
      </button>
    </div>
  )
}

export default BundleCard
