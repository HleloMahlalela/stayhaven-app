import { createContext, useContext, useState } from 'react'
const AppAdminDataContext = createContext(null)

export function AppAdminDataProvider({ children }) {
  const [listings, setListings] = useState([])
  const [administrators, setAdministrators] = useState([])

  return (
    <AppAdminDataContext.Provider value={{ listings, setListings, administrators, setAdministrators }}>
      {children}
    </AppAdminDataContext.Provider>
  )
}

export function useAppAdminData() {
  const context = useContext(AppAdminDataContext)
  if (!context) throw new Error('useAppAdminData must be used within AppAdminDataProvider')
  return context
}

export function getAdminListings(admin, listings = []) {
  return listings.filter((listing) => admin.listingIds?.includes(listing.id))
}
