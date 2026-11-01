import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'

export default function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const user = await login(email, password)
      const destination = {
        GUEST: '/',
        HOUSE_ADMIN: '/houseadmin/dashboard',
        APP_ADMIN: '/appadmin/overview',
      }[user?.role]

      if (!destination) {
        throw new Error('The login response did not include a valid user role.')
      }

      navigate(destination)
    } catch (requestError) {
      setError(requestError.response?.data?.error?.message || requestError.response?.data?.message || requestError.message || 'Unable to sign in. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="mt-6 flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="mb-2 block text-[14px] font-semibold text-[#0F172A] dark:text-white" htmlFor="login-email">
          Email address
        </label>
        <input
          autoComplete="username"
          className="h-[52px] w-full rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-4 text-[15px] text-[#0F172A] placeholder-[#94A3B8] transition-all focus:outline-none focus:ring-2 focus:ring-[#7C3AED] dark:border-[#1E2A45] dark:bg-[#0A0E1A] dark:text-white dark:placeholder-[#64748B] dark:focus:border-[#8B5CF6] dark:focus:ring-[#8B5CF6]"
          id="login-email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter account"
          required
          type="email"
          value={email}
        />
      </div>

      <div className="mt-5 flex flex-col">
        <div className="mb-2 flex items-center justify-between">
          <label className="block text-[14px] font-semibold text-[#0F172A] dark:text-white" htmlFor="login-password">
            Password
          </label>
          <a className="text-[13px] font-medium text-[#7C3AED] transition-colors hover:text-[#6D28D9] dark:text-[#A78BFA] dark:hover:text-[#C4B5FD]" href="#forgot-password">
            Forgot?
          </a>
        </div>
        <div className="relative flex items-center">
          <input
            autoComplete="current-password"
            className="h-[52px] w-full rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-4 pr-12 text-[15px] text-[#0F172A] placeholder-[#94A3B8] transition-all focus:outline-none focus:ring-2 focus:ring-[#7C3AED] dark:border-[#1E2A45] dark:bg-[#0A0E1A] dark:text-white dark:placeholder-[#64748B] dark:focus:border-[#8B5CF6] dark:focus:ring-[#8B5CF6]"
            id="login-password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            required
            type={showPassword ? 'text' : 'password'}
            value={password}
          />
          <button
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3.5 text-[#64748B] transition-colors hover:text-[#0F172A] dark:text-[#64748B] dark:hover:text-[#94A3B8]"
            onClick={() => setShowPassword((visible) => !visible)}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? 'visibility' : 'visibility_off'}
            </span>
          </button>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}

      <button
        className="mt-6 flex h-[52px] w-full cursor-pointer items-center justify-center rounded-full border-0 bg-[#7C3AED] text-[16px] font-semibold text-white shadow-sm transition-colors hover:bg-[#6D28D9] active:scale-[0.98] dark:bg-gradient-to-r dark:from-[#8B5CF6] dark:to-[#7C3AED] dark:font-bold dark:tracking-wide dark:shadow-[0_4px_20px_rgba(139,92,246,0.4)] dark:hover:shadow-[0_0_28px_rgba(139,92,246,0.6)]"
        disabled={submitting}
        type="submit"
      >
        {submitting ? 'Signing in…' : 'Sign in'}
      </button>
      <p className="mt-5 text-center text-sm text-[#64748B] dark:text-[#94A3B8]">
        New to StayHaven? <Link className="font-semibold text-[#7C3AED] hover:underline dark:text-[#A78BFA]" to="/guest-registration">Create a guest account</Link>
      </p>
    </form>
  )
}
