const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[60] flex flex-col w-full">
      <div className="bg-[#FBB900] text-secondary text-[10px] md:text-xs py-1.5 px-4 text-center font-bold uppercase tracking-wider">
        ATENÇÃO! Descontos e cupons promocionais só podem ser obtidos em nossos canais oficiais.
      </div>
      <nav className="sticky-header bg-header-bg dark:bg-background-dark px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-primary font-display text-2xl flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-4xl">restaurant</span>
              <span className="leading-none">
                KING<br />
                <span className="text-secondary dark:text-accent">BURGER</span>
              </span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-10 font-black text-sm uppercase tracking-widest text-secondary dark:text-accent">
            <a className="hover:text-primary transition-colors" href="#">
              Menu
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Promoções
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Kids Menu
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              App
            </a>
          </div>
          <div className="flex items-center gap-4">
            {/* <button className="bg-primary text-white px-8 py-3 rounded-lg font-black uppercase text-sm hover:scale-105 transition active:scale-95 shadow-lg shadow-primary/20">
              Pedir Agora
            </button> */}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

