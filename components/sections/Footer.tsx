import FadeUp from '@/components/ui/FadeUp'

const links = {
  Services: [
    { label: 'AI Infrastructure', href: '#solutions' },
    { label: 'Cloud Cost Reduction', href: '#solutions' },
    { label: 'Kubernetes Optimization', href: '#solutions' },
  ],
  Company: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Case Studies', href: '#case-examples' },
    { label: 'Book Audit', href: '#cta' },
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
              <a
                href="#"
                className="flex items-center gap-2 mb-4"
                aria-label="CloudOptic home"
              >
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 2C5.13 2 2 5.13 2 9s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7z"
                      fill="white"
                      fillOpacity="0.3"
                    />
                    <circle cx="9" cy="9" r="3" fill="white" />
                    <path
                      d="M9 4v2M9 12v2M4 9h2M12 9h2"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span className="font-bold text-[17px] text-gray-900 tracking-tight">
                  Cloud<span className="text-primary">Optic</span>
                </span>
              </a>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">
                Elite FinOps engineers who cut cloud costs without cutting
                performance.
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

          {/* Bottom bar */}
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} CloudOptic. All rights reserved.
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
