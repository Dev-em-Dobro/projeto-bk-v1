import { useState, useEffect } from 'react'

const SCROLL_THRESHOLD = 60

const Header = () => {
  const [retracted, setRetracted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setRetracted(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Menu', href: '#' },
    { label: 'Promoções', href: '#' },
    { label: 'Kids Menu', href: '#' },
    { label: 'App', href: '#' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] flex flex-col w-full transition-all duration-300">
      <div
        className={`bg-[#FBB900] text-secondary px-4 text-center font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden ${
          retracted ? 'text-[8px] md:text-[10px] py-0.5 opacity-90' : 'text-[10px] md:text-xs py-1.5'
        }`}
      >
        ATENÇÃO! Descontos e cupons promocionais só podem ser obtidos em nossos canais oficiais.
      </div>
      <nav
        className={`sticky-header bg-header-bg dark:bg-background-dark px-4 md:px-6 transition-all duration-300 ${
          retracted ? 'py-2' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`text-primary font-display flex items-center gap-2 cursor-pointer leading-none transition-all duration-300 ${
                retracted ? 'text-lg' : 'text-2xl'
              }`}
            >
              <span
                className={`material-symbols-outlined transition-all duration-300 ${
                  retracted ? 'text-2xl' : 'text-4xl'
                }`}
              >
                restaurant
              </span>
              <span className="leading-none">
                KING<br />
                <span className="text-secondary dark:text-accent">BURGER</span>
              </span>
            </div>
          </div>
          <div
            className={`hidden lg:flex items-center font-black uppercase tracking-widest text-secondary dark:text-accent transition-all duration-300 ${
              retracted ? 'gap-6 text-xs' : 'gap-10 text-sm'
            }`}
          >
            {navLinks.map((link) => (
              <a key={link.label} className="hover:text-primary transition-colors" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Botão menu hambúrguer - apenas mobile */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-secondary dark:text-accent hover:bg-black/5 dark:hover:bg-white/10 transition"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <span className="material-symbols-outlined text-3xl">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Menu mobile (drawer) */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[59] lg:hidden"
            aria-hidden
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="fixed top-0 right-0 bottom-0 w-64 max-w-[85vw] bg-header-bg dark:bg-background-dark shadow-xl z-[61] lg:hidden flex flex-col pt-20 px-4"
            role="dialog"
            aria-label="Menu de navegação"
          >
            <nav className="flex flex-col gap-2 font-black uppercase tracking-widest text-secondary dark:text-accent">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="py-3 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  )
}

export default Header

