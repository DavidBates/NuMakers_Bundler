import { Fragment, useMemo, useState } from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import './ProfileTable.css'

function ProfileTable({ profiles, selectedProfiles, onSelectionChange }) {
  const [expandedGroups, setExpandedGroups] = useState(new Set())

  const groupedProfiles = useMemo(() => {
    const groups = profiles.reduce((acc, profile) => {
      const group = acc.get(profile.filamentType) || []
      group.push(profile)
      acc.set(profile.filamentType, group)
      return acc
    }, new Map())

    return Array.from(groups.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([material, items]) => ({
        material,
        items: [...items].sort((a, b) => a.printer.localeCompare(b.printer))
      }))
  }, [profiles])

  const visibleProfiles = useMemo(
    () => groupedProfiles.flatMap(group => (expandedGroups.has(group.material) ? group.items : [])),
    [groupedProfiles, expandedGroups]
  )

  const toggleGroup = (material) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(material)) {
        next.delete(material)
      } else {
        next.add(material)
      }
      return next
    })
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      onSelectionChange(visibleProfiles.map(p => p.id))
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

  const allVisibleSelected = visibleProfiles.length > 0 && visibleProfiles.every(profile => selectedProfiles.includes(profile.id))

  return (
    <div className="profile-table-container">
      <div className="table-header">
        <h3>Presets</h3>
        <p>{profiles.length} presets in {groupedProfiles.length} materials.</p>
        <button className="btn-primary" onClick={downloadSelected} disabled={selectedProfiles.length === 0}>
          Download Selected
        </button>
      </div>

      <div className="table-wrapper">
        <table className="profile-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={handleSelectAll}
                  aria-label="Select expanded profiles"
                />
              </th>
              <th>Material</th>
              <th>Filament Preset</th>
              <th>Printer</th>
              <th>Download Action</th>
            </tr>
          </thead>
          <tbody>
            {groupedProfiles.map(group => {
              const expanded = expandedGroups.has(group.material)
              return (
                <Fragment key={group.material}>
                  <tr className="group-row" onClick={() => toggleGroup(group.material)}>
                    <td className="checkbox-col" />
                    <td>
                      <span className="expander">{expanded ? '▾' : '▸'}</span> {group.material}
                    </td>
                    <td>{group.items.length} presets</td>
                    <td>-</td>
                    <td className="group-action">Click to {expanded ? 'collapse' : 'expand'}</td>
                  </tr>
                  {expanded && group.items.map(profile => (
                    <tr key={profile.id} className={selectedProfiles.includes(profile.id) ? 'selected' : ''}>
                      <td className="checkbox-col">
                        <input
                          type="checkbox"
                          checked={selectedProfiles.includes(profile.id)}
                          onChange={() => handleSelectOne(profile.id)}
                          aria-label={`Select ${profile.fileName}`}
                        />
                      </td>
                      <td>{profile.filamentType}</td>
                      <td>{profile.fileName.replace('.json', '')}</td>
                      <td>{profile.printer} ({profile.nozzleSize})</td>
                      <td>
                        <button
                          className="btn-json"
                          onClick={() => downloadProfile(profile)}
                          title="Download profile"
                          aria-label={`Download ${profile.fileName}`}
                        >
                          JSON
                        </button>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              )
            })}
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
