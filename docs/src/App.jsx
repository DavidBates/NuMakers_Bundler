import { useState, useMemo } from 'react'
import './App.css'
import profilesData from './profiles.json'
import ProfileTable from './components/ProfileTable'
import FilterBar from './components/FilterBar'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [selectedProfiles, setSelectedProfiles] = useState([])
  const [filters, setFilters] = useState({
    filamentType: '',
    printer: '',
    nozzleSize: '',
    search: ''
  })

  // Extract unique filter options
  const filterOptions = useMemo(() => ({
    filamentTypes: [...new Set(profilesData.map(p => p.filamentType))].sort(),
    printers: [...new Set(profilesData.map(p => p.printer))].sort(),
    nozzleSizes: [...new Set(profilesData.map(p => p.nozzleSize))].sort()
  }), [])

  // Apply filters
  const filteredProfiles = useMemo(() => {
    return profilesData.filter(profile => {
      if (filters.filamentType && profile.filamentType !== filters.filamentType) return false
      if (filters.printer && profile.printer !== filters.printer) return false
      if (filters.nozzleSize && profile.nozzleSize !== filters.nozzleSize) return false
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        return (
          profile.filamentType.toLowerCase().includes(searchLower) ||
          profile.printer.toLowerCase().includes(searchLower) ||
          profile.fileName.toLowerCase().includes(searchLower)
        )
      }
      return true
    })
  }, [filters])

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }))
  }

  const handleClearFilters = () => {
    setFilters({
      filamentType: '',
      printer: '',
      nozzleSize: '',
      search: ''
    })
  }

  return (
    <div className="app">
      <Header 
        totalProfiles={profilesData.length}
        filteredCount={filteredProfiles.length}
        selectedCount={selectedProfiles.length}
      />
      
      <main className="main-content">
        <FilterBar
          filters={filters}
          filterOptions={filterOptions}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <ProfileTable
          profiles={filteredProfiles}
          selectedProfiles={selectedProfiles}
          onSelectionChange={setSelectedProfiles}
        />
      </main>

      <Footer />
    </div>
  )
}

export default App
