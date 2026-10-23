import { useNavigate } from 'react-router-dom'
import Explore from '../Explore'
import LoginForm from './components/LoginForm'

export default function Login() {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen w-full bg-[#F8F9FA] dark:bg-[#0A0E1A] text-[#0F172A] dark:text-[#F1F5F9] transition-colors pb-24 md:pb-0">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-10 pb-12 md:pb-16">
      <div className="pointer-events-none select-none blur-[2px] opacity-40" aria-hidden="true">
        <Explore />
      </div>
      <div
        aria-labelledby="login-title"
        aria-modal="true"
        className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(15,23,42,0.55)] p-4 backdrop-blur-md dark:bg-[#0A0E1A]/85 dark:backdrop-blur-[8px] sm:p-6"
        role="dialog"
      >
        <section className="relative flex w-full max-w-[520px] flex-col rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-2xl dark:border-[#1E2A45] dark:bg-[#141B2D] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.75),0_0_40px_rgba(139,92,246,0.15)] sm:p-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/30 dark:bg-[#8B5CF6]">
                <span className="material-symbols-outlined text-[20px]">home</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-[#0F172A] dark:text-[18px] dark:text-white">StayHaven</span>
            </div>
            <button
              aria-label="Close login"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F5F9] text-[#64748B] transition-colors hover:bg-[#E2E8F0] dark:bg-[#1E2A45] dark:text-[#94A3B8] dark:hover:bg-[#FAF8FF] dark:hover:text-[#141B2D]"
              onClick={() => navigate('/')}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="mt-8">
            <h1 className="text-[32px] font-extrabold leading-tight tracking-tight text-[#0F172A] dark:text-[#F1F5F9]" id="login-title">
              Welcome back
            </h1>
            <p className="mt-2 text-[15px] font-normal text-[#64748B] dark:text-[#94A3B8]">
              Sign in with your registered account.
            </p>
          </div>

          <LoginForm />

          <div className="mt-6 flex flex-col items-center text-center">
            <p className="text-[14px] text-[#64748B] dark:text-[#94A3B8]">
              New to StayHaven?
              <a className="ml-1 font-semibold text-[#7C3AED] hover:underline dark:text-[#A78BFA]" href="#create-account">
                Create an account
              </a>
            </p>
            <p className="mt-4 max-w-sm text-[12px] leading-relaxed text-[#94A3B8] dark:text-[#64748B]">
              Your registered account automatically determines which workspace you can access.
            </p>
          </div>
        </section>
      </div>
      </div>
    </main>
  )
}
