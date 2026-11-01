import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../../services/api'

export default function HostRegistration() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)
    const fullName = form.get('name')
    const email = form.get('email')
    const password = form.get('password')
    if (password !== form.get('confirmPassword')) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    try {
      await api.post('/auth/register', { fullName, email, password, role: 'HOUSE_ADMIN' })
      window.alert('Your host account has been created. Please sign in.')
      navigate('/login')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to create your account. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return <main className="min-h-screen w-full bg-[#F8F9FA] px-4 py-12 text-[#0F172A] dark:bg-[#0A0E1A] dark:text-[#F1F5F9]"><div className="mx-auto w-full max-w-[1440px]">
    <section className="mx-auto max-w-xl rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]">
      <p className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Become a host</p>
      <h1 className="mt-2 text-3xl font-extrabold">Create your house admin account</h1>
      <p className="mt-2 text-[#64748B] dark:text-[#94A3B8]">Register to list and manage your guesthouses.</p>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {[['name', 'Name', 'text'], ['email', 'Email', 'email'], ['password', 'Password', 'password'], ['confirmPassword', 'Confirm Password', 'password']].map(([name, label, type]) => <label className="block" key={name}>
          <span className="mb-2 block text-sm font-semibold">{label}</span>
          <input autoComplete={name === 'confirmPassword' ? 'new-password' : name === 'password' ? 'new-password' : name} className="h-12 w-full rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-4 outline-none focus:ring-2 focus:ring-[#7C3AED] dark:border-[#1E2A45] dark:bg-[#0A0E1A]" name={name} required type={type} />
        </label>)}
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        <button className="w-full rounded-full bg-[#7C3AED] px-6 py-3 font-semibold text-white disabled:opacity-60" disabled={submitting} type="submit">{submitting ? 'Creating account…' : 'Create host account'}</button>
      </form>
      <p className="mt-5 text-center text-sm text-[#64748B]">Already registered? <Link className="font-semibold text-[#7C3AED]" to="/login">Sign in</Link></p>
    </section>
  </div></main>
}
