import FadeUp from '@/components/ui/FadeUp'

const links = {
  'For Companies': [
    { label: 'AI Infrastructure', href: '#solutions' },
    { label: 'Cloud Cost Reduction', href: '#solutions' },
    { label: 'Kubernetes Optimization', href: '#solutions' },
    { label: 'Book Free Audit', href: '#cta' },
  ],
  'For Experts': [
    { label: 'Join Our Network', href: '#for-experts' },
    { label: 'How It Works', href: '#how-it-works' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="flex items-center gap-2 mb-4" aria-label="Anthropi home">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M14.5 9.8a2 2 0 00-1.3-1.8l-.1-.1A3.2 3.2 0 005.3 8a2 2 0 00-1.8 2 2 2 0 002 2h7a2 2 0 002-2.2z" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="0.9" strokeLinejoin="round" />
                    <circle cx="9" cy="6.8" r="1.5" fill="white" />
                    <path d="M6.4 11.6c0-1.4 1.2-2.6 2.6-2.6s2.6 1.2 2.6 2.6" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
                <span className="font-bold text-[17px] text-gray-900 tracking-tight">
                  Anthro<span className="text-primary">pi</span>
                </span>
              </a>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">
                Elite FinOps engineers who cut cloud costs without cutting performance.
              </p>
            </div>

            {/* Links */}
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-900 mb-4">
                  {group}
                </p>
                <ul className="space-y-2.5" role="list">
                  {items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Anthropi. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
              <span className="text-xs text-gray-400">All systems operational</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </footer>
  )
}
