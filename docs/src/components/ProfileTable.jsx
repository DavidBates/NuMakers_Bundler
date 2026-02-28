import { useState } from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import './ProfileTable.css'

function ProfileTable({ profiles, selectedProfiles, onSelectionChange }) {
  const [sortConfig, setSortConfig] = useState({ key: 'filamentType', direction: 'asc' })

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const sortedProfiles = [...profiles].sort((a, b) => {
    const aVal = a[sortConfig.key]
    const bVal = b[sortConfig.key]
    const direction = sortConfig.direction === 'asc' ? 1 : -1
    return aVal.localeCompare(bVal) * direction
  })

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectionChange(profiles.map(p => p.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectOne = (id) => {
    onSelectionChange(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const downloadProfile = async (profile) => {
    try {
      const response = await fetch(`/${profile.filePath}`)
      const blob = await response.blob()
      saveAs(blob, profile.fileName)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download profile. Please try again.')
    }
  }

  const downloadSelected = async () => {
    if (selectedProfiles.length === 0) return

    try {
      const zip = new JSZip()
      const selectedData = profiles.filter(p => selectedProfiles.includes(p.id))

      for (const profile of selectedData) {
        const response = await fetch(`/${profile.filePath}`)
        const blob = await response.blob()
        const text = await blob.text()
        zip.file(profile.fileName, text)
      }

      const content = await zip.generateAsync({ type: 'blob' })
      saveAs(content, `numakers-profiles-${Date.now()}.zip`)
      onSelectionChange([])
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to create zip file. Please try again.')
    }
  }

  const allSelected = profiles.length > 0 && selectedProfiles.length === profiles.length

  return (
    <div className="profile-table-container">
      {selectedProfiles.length > 0 && (
        <div className="bulk-actions">
          <button className="btn-primary" onClick={downloadSelected}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Selected ({selectedProfiles.length})
          </button>
          <button className="btn-secondary" onClick={() => onSelectionChange([])}>
            Clear Selection
          </button>
        </div>
      )}

      <div className="table-wrapper">
        <table className="profile-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  aria-label="Select all profiles"
                />
              </th>
              <th onClick={() => handleSort('filamentType')} className="sortable">
                Filament Type
                {sortConfig.key === 'filamentType' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('printer')} className="sortable">
                Printer
                {sortConfig.key === 'printer' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('nozzleSize')} className="sortable">
                Nozzle Size
                {sortConfig.key === 'nozzleSize' && (
                  <span className="sort-indicator">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="actions-col">Download</th>
            </tr>
          </thead>
          <tbody>
            {sortedProfiles.map(profile => (
              <tr key={profile.id} className={selectedProfiles.includes(profile.id) ? 'selected' : ''}>
                <td className="checkbox-col">
                  <input
                    type="checkbox"
                    checked={selectedProfiles.includes(profile.id)}
                    onChange={() => handleSelectOne(profile.id)}
                    aria-label={`Select ${profile.fileName}`}
                  />
                </td>
                <td className="filament-type">{profile.filamentType}</td>
                <td className="printer">{profile.printer}</td>
                <td className="nozzle-size">{profile.nozzleSize}</td>
                <td className="actions-col">
                  <button
                    className="btn-icon"
                    onClick={() => downloadProfile(profile)}
                    title="Download profile"
                    aria-label={`Download ${profile.fileName}`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {profiles.length === 0 && (
        <div className="no-results">
          No profiles match your filters. Try adjusting your selection.
        </div>
      )}
    </div>
  )
}

export default ProfileTable
