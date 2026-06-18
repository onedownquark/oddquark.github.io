import { useEffect, useRef, useState } from 'react'

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const stars: { x: number; y: number; size: number; speed: number }[] = []
    const starCount = 100

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initStars = () => {
      stars.length = 0
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speed: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'white'
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = -star.size
          star.x = Math.random() * canvas.width
        }
      })
      animationFrameId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize()
    initStars()
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-50 motion-reduce:hidden"
    />
  )
}

const SocialLink = ({ href, icon, label, primary = false, rel }: { href: string; icon: React.ReactNode; label: string; primary?: boolean; rel?: string }) => (
  <a
    href={href}
    target="_blank"
    rel={rel || "noopener noreferrer"}
    className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 border ${
      primary
        ? "bg-electric-blue/20 border-electric-blue text-white hover:bg-electric-blue/30 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
        : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </a>
)

const Icons = {
  Mastodon: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.28 8.97.55 11.985c.268 3.015.065 5.564.065 5.564 0 3.086 2.108 5.746 4.941 5.958 1.452.11 2.847.155 4.157.13 2.346-.045 3.512-.553 3.512-.553l-.064-1.29s-2.143.603-4.504.546c-2.322-.056-4.363-.395-4.746-2.688-.034-.195-.044-.391-.03-.586 2.108.49 4.695.598 7.33.474 2.657-.125 4.947-.512 7.162-1.15.025-.007.05-.015.075-.022 2.454-.704 4.146-2.454 4.467-5.114.11-1.144.314-3.85.03-6.732zM15.64 15.105L13.107 9.57l-2.495 5.535h-1.744V7.492h1.474v5.044l2.07-4.59h1.398l2.07 4.59V7.492h1.475v7.613h-1.744z"/>
    </svg>
  ),
  Email: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  GitHub: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.354 6.839 9.678.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  ),
  X: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
}

export default function App() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return (
    <div className="relative min-h-screen bg-cosmic-black text-white overflow-x-hidden font-sans selection:bg-electric-blue/30 selection:text-accent-cyan">
      {/* Background Layer */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen pointer-events-none"
        style={{ backgroundImage: 'url("/images/flux-bg-optimized.webp")' }}
      />
      {!reducedMotion && <Starfield />}

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center px-4 pt-16 pb-24 max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mb-16 animate-fade-in animate-slide-in-bottom [--tw-enter-translate-y:2rem] motion-reduce:animate-none">
          <div className="relative mb-8 group">
            <div className="absolute inset-0 rounded-full bg-nebula-purple/50 blur-2xl group-hover:bg-electric-blue/50 transition-colors duration-500" />
            <img
              src="/images/avatar-optimized.webp"
              alt="oddquark avatar"
              className="relative w-40 h-40 rounded-full border-4 border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-105 object-cover"
            />
          </div>

          <h1 className="text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-accent-cyan via-electric-blue to-nebula-magenta bg-clip-text text-transparent">
            oddquark
          </h1>

          <p className="text-sm font-mono tracking-widest text-accent-cyan/80 uppercase mb-6">
            Space nerd posting NASA, SpaceX & spaceflight updates
          </p>

          <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
            Moon missions, Mars dreams, rockets, probes & cosmic rabbit holes.
            Amateur skywatcher | science-curious | quark-brained
          </p>
        </section>

        {/* Contact Card */}
        <section className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-16 shadow-2xl animate-fade-in animate-slide-in-bottom [--tw-enter-translate-y:3rem] motion-reduce:animate-none [animation-delay:200ms] [animation-fill-mode:backwards]">
          <h2 className="text-2xl font-semibold mb-8 text-center text-white/90">Get in touch</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <SocialLink
              href="mailto:oddquark@atomicmail.io"
              icon={<Icons.Email />}
              label="Email"
              primary
            />
            <SocialLink
              href="https://social.vivaldi.net/@oddquark"
              icon={<Icons.Mastodon />}
              label="Mastodon"
              primary
              rel="me"
            />
            <SocialLink
              href="https://github.com/onedownquark"
              icon={<Icons.GitHub />}
              label="GitHub"
            />
            <SocialLink
              href="https://x.com/onedownquark"
              icon={<Icons.X />}
              label="X"
            />
          </div>
        </section>

        {/* About Section */}
        <section className="w-full max-w-2xl text-center mb-16 animate-fade-in animate-slide-in-bottom [--tw-enter-translate-y:4rem] motion-reduce:animate-none [animation-delay:400ms] [animation-fill-mode:backwards]">
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-nebula-purple to-electric-blue mb-6">
            <div className="px-4 py-1 rounded-full bg-cosmic-black text-xs font-mono uppercase tracking-widest">
              About
            </div>
          </div>
          <p className="text-lg text-white/70 leading-relaxed italic">
            "Fascinated by the machinery that gets us off this rock and the data that tells us where we are.
            From the latest Starship hop to the furthest Voyager signal, I'm here for the ride."
          </p>
        </section>

        {/* Footer */}
        <footer className="w-full text-center py-8 border-t border-white/10 mt-auto opacity-50 text-sm font-mono">
          <p className="mb-2">© 2026 oddquark</p>
          <a
            href="https://github.com/onedownquark/oddquark.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-cyan transition-colors"
          >
            view source
          </a>
        </footer>
      </main>
    </div>
  )
}
