import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import { useAuth } from '../../../context/AuthContext'

const normalizeUser = (user) => ({
  ...user,
  name: user?.name ?? user?.fullName ?? '',
  email: user?.email ?? '',
  role: user?.role ?? '',
})

const inputClass = 'mt-1 h-12 w-full rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-4 text-[#0F172A] outline-none focus:ring-2 focus:ring-[#7C3AED] dark:border-[#1E2A45] dark:bg-[#0A0E1A] dark:text-white'

export default function Profile() {
  const navigate = useNavigate()
  const { user: authUser, logout } = useAuth()
  const [userData, setUserData] = useState(() => normalizeUser(authUser || {}))
  const [name, setName] = useState(userData.name)
  const [email, setEmail] = useState(userData.email)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    api.get('/auth/me')
      .then(({ data }) => {
        if (!active) return
        const nextUser = normalizeUser(data.user ?? data)
        setUserData(nextUser)
        setName(nextUser.name)
        setEmail(nextUser.email)
      })
      .catch((requestError) => {
        if (active) setError(requestError.response?.data?.error?.message || 'Unable to load your profile. Please sign in again.')
      })
      .finally(() => { if (active) setIsLoading(false) })
    return () => { active = false }
  }, [])

  function startEditing() {
    setName(userData.name)
    setEmail(userData.email)
    setError('')
    setIsEditing(true)
  }

  async function saveProfile(event) {
    event.preventDefault()
    setError('')
    setIsSaving(true)
    try {
      const { data } = await api.put('/auth/profile', { name: name.trim(), email: email.trim() })
      const nextUser = normalizeUser({ ...userData, ...(data.user ?? data), name: data.user?.name ?? data.user?.fullName ?? data.name ?? data.fullName ?? name.trim(), email: data.user?.email ?? data.email ?? email.trim() })
      setUserData(nextUser)
      setName(nextUser.name)
      setEmail(nextUser.email)
      setIsEditing(false)
      window.alert('Profile updated!')
    } catch (requestError) {
      setError(requestError.response?.data?.error?.message || 'Unable to update your profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  function signOut() {
    logout()
    navigate('/login')
  }

  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] px-4 py-12 text-[#0F172A] dark:bg-[#0A0E1A] dark:text-[#F1F5F9]">
      <div className="mx-auto w-full max-w-[1440px]">
        <section className="mx-auto max-w-2xl rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Account</p>
          <h1 className="mt-2 text-3xl font-extrabold">Your profile</h1>
          {isLoading && <p className="mt-6 text-sm text-[#64748B] dark:text-[#94A3B8]">Loading profile…</p>}
          {error && <p className="mt-6 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}

          {!isLoading && (isEditing ? (
            <form className="mt-8 space-y-5" onSubmit={saveProfile}>
              <label className="block text-sm font-semibold" htmlFor="profile-name">Name<input id="profile-name" className={inputClass} autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} /></label>
              <label className="block text-sm font-semibold" htmlFor="profile-email">Email<input id="profile-email" className={inputClass} autoComplete="email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
              <p className="border-b border-[#E5E7EB] pb-4 text-sm dark:border-[#1E2A45]"><span className="text-[#64748B] dark:text-[#94A3B8]">Role</span><span className="mt-1 block font-semibold">{userData.role || '—'}</span></p>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full bg-[#7C3AED] px-7 py-3 font-semibold text-white disabled:opacity-60" type="submit" disabled={isSaving}>{isSaving ? 'Saving…' : 'Save Changes'}</button>
                <button className="rounded-full border border-[#E5E7EB] px-7 py-3 font-semibold dark:border-[#334155]" type="button" onClick={() => { setIsEditing(false); setError('') }}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <dl className="mt-8 space-y-5">
                {[
                  ['Name', userData.name],
                  ['Email', userData.email],
                  ['Role', userData.role],
                ].map(([label, value]) => <div className="border-b border-[#E5E7EB] pb-4 dark:border-[#1E2A45]" key={label}><dt className="text-sm text-[#64748B] dark:text-[#94A3B8]">{label}</dt><dd className="mt-1 font-semibold">{value || '—'}</dd></div>)}
              </dl>
              <button className="mt-8 rounded-full bg-[#7C3AED] px-7 py-3 font-semibold text-white" onClick={startEditing} type="button">Edit Profile</button>
            </>
          ))}
          <button className="ml-3 mt-8 rounded-full border border-[#E5E7EB] px-7 py-3 font-semibold dark:border-[#334155]" onClick={signOut} type="button">Sign out</button>
        </section>
      </div>
    </main>
  )
}
