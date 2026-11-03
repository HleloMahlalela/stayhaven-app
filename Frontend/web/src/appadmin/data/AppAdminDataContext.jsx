import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import api, { resolveAssetUrl } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
const AppAdminDataContext = createContext(null)

export function AppAdminDataProvider({ children }) {
  const { user, loading } = useAuth()
  const [listings, setListings] = useState([])
  const [administrators, setAdministrators] = useState([])
  const fetchListings = useCallback(async () => {
    try {
      const { data } = await api.get(user?.role === 'APP_ADMIN' ? '/listings/admin/all' : '/listings/admin/my-listings')
      setListings((Array.isArray(data) ? data : []).map(normalizeListing))
    } catch (error) { console.error('Failed to fetch listings:', error.response?.data || error.message) }
  }, [user?.role])

  const fetchAdministrators = useCallback(async () => {
    try {
      const { data } = await api.get('/users?role=HOUSE_ADMIN')
      console.log('Fetched Users:', data)
      setAdministrators((Array.isArray(data) ? data : []).filter((user) => user.role === 'HOUSE_ADMIN').map(normalizeAdmin))
    } catch (error) {
      console.error('Failed to fetch admins:', error.response?.data || error.message);
      setAdministrators([]);
    }
  }, [])

  const refetchAll = useCallback(() => Promise.all([user?.role === 'APP_ADMIN' ? fetchAdministrators() : Promise.resolve(), fetchListings()]), [fetchAdministrators, fetchListings, user?.role])

  useEffect(() => {
    if (loading) return
    if (!user) {
      setAdministrators([])
      setListings([])
      return
    }
    refetchAll()
  }, [loading, user, refetchAll])

  return (
    <AppAdminDataContext.Provider value={{ listings, setListings, administrators, setAdministrators, fetchListings, fetchAdministrators, refetchAll }}>
      {children}
    </AppAdminDataContext.Provider>
  )
}

export const normalizeListing = (listing) => ({ ...listing, id: listing._id || listing.id, name: listing.title || listing.name, image: resolveAssetUrl(listing.images?.[0] || listing.image || ''), price: listing.pricePerNight ?? listing.price ?? 0, owner: listing.host?.fullName || listing.host?.name || listing.hostName || 'House admin', location: listing.location || '', status: String(listing.status || 'pending').toLowerCase() === 'approved' ? 'Active' : String(listing.status || 'pending').toLowerCase().replace(/^./, (letter) => letter.toUpperCase()) })
export const normalizeAdmin = (admin) => ({ ...admin, id: admin._id || admin.id, name: admin.name || admin.fullName || admin.email || 'House admin', initials: (admin.name || admin.fullName || admin.email || 'HA').split(/[\s@]+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase(), status: String(admin.status || 'ACTIVE').toUpperCase() === 'SUSPENDED' ? 'Suspended' : 'Approved' })

export function useAppAdminData() {
  const context = useContext(AppAdminDataContext)
  if (!context) throw new Error('useAppAdminData must be used within AppAdminDataProvider')
  return context
}

export function getAdminListings(admin, listings = []) {
  return listings.filter((listing) => listing.hostId === admin.id || admin.listingIds?.includes(listing.id))
}
