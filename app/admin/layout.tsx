import { requireAdmin } from '@/lib/require-admin'
import SignOutButton from '@/app/admin/_components/SignOutButton'
import Link from 'next/link'

export const metadata = {
  robots: 'noindex, nofollow',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col py-6 px-3 shrink-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 px-3 mb-8">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M14.5 9.8a2 2 0 00-1.3-1.8l-.1-.1A3.2 3.2 0 005.3 8a2 2 0 00-1.8 2 2 2 0 002 2h7a2 2 0 002-2.2z" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="0.9" strokeLinejoin="round" />
              <circle cx="9" cy="6.8" r="1.5" fill="white" />
              <path d="M6.4 11.6c0-1.4 1.2-2.6 2.6-2.6s2.6 1.2 2.6 2.6" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-900">Anthropi Admin</span>
        </Link>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          <Link
            href="/admin/applied"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 4h12M2 8h8M2 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Applied
          </Link>
          <Link
            href="/admin/jobs"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="2" y="4" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M8 9v4M6 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Jobs
          </Link>
        </nav>

        {/* Sign out */}
        <SignOutButton />
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
