import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../../services/api'

const inputClass = 'h-12 w-full rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-4 text-[#0F172A] outline-none focus:ring-2 focus:ring-[#7C3AED] dark:border-[#1E2A45] dark:bg-[#0A0E1A] dark:text-white'

export default function GuestRegistration() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const password = String(form.get('password') || '')
    const confirmPassword = String(form.get('confirmPassword') || '')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    try {
      await api.post('/auth/register', { name, fullName: name, email, password, role: 'GUEST' })
      window.alert('Account created successfully!')
      navigate('/login')
    } catch (requestError) {
      setError(requestError.response?.data?.error?.message || requestError.response?.data?.message || 'Unable to create your account. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] px-4 py-12 text-[#0F172A] dark:bg-[#0A0E1A] dark:text-[#F1F5F9]">
      <section className="mx-auto max-w-xl rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm dark:border-[#1E2A45] dark:bg-[#141B2D]">
        <p className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Join StayHaven</p>
        <h1 className="mt-2 text-3xl font-extrabold">Create a guest account</h1>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {[
            ['name', 'Full Name', 'text', 'name'],
            ['email', 'Email', 'email', 'email'],
            ['password', 'Password', 'password', 'new-password'],
            ['confirmPassword', 'Confirm Password', 'password', 'new-password'],
          ].map(([name, label, type, autoComplete]) => (
            <label className="block" key={name}>
              <span className="mb-2 block text-sm font-semibold">{label}</span>
              <input className={inputClass} autoComplete={autoComplete} name={name} required minLength={type === 'password' ? 10 : undefined} type={type} />
            </label>
          ))}
          {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
          <button className="w-full rounded-full bg-[#7C3AED] px-6 py-3 font-semibold text-white disabled:opacity-60" disabled={submitting} type="submit">
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-[#64748B] dark:text-[#94A3B8]">Already registered? <Link className="font-semibold text-[#7C3AED] dark:text-[#A78BFA]" to="/login">Sign in</Link></p>
      </section>
    </main>
  )
}
