import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const AppSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [ripple, setRipple] = useState<{ x: number; y: number; id: string } | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const phoneVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.3 + i * 0.1,
        type: 'spring' as const,
        stiffness: 200,
      },
    }),
  }

  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  }

  const handleRipple = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setRipple({ x, y, id })
    setTimeout(() => setRipple(null), 600)
  }

  const icons = [
    { icon: 'restaurant_menu', key: 'menu' },
    { icon: 'confirmation_number', key: 'ticket' },
    { icon: 'location_on', key: 'location' },
  ]

  return (
    <motion.section
      ref={sectionRef}
      className="bg-secondary dark:bg-black py-24 text-white"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          className="flex justify-center"
          variants={phoneVariants}
          animate={floatAnimation}
        >
          <div className="relative w-72 h-[580px] bg-black rounded-[3rem] border-8 border-neutral-800 shadow-2xl overflow-hidden">
            <div className="bg-accent h-full p-4">
              <div className="flex items-center gap-2 mb-6 text-secondary">
                <span className="material-symbols-outlined text-primary">stars</span>
                <span className="font-display text-lg">Clube KB</span>
              </div>
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <img
                    alt="App Preview"
                    className="rounded-xl mb-3"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDoxiC4gwTGbIXlpF388Lff5cTT_jaP67NrZJFHR073WmXCUQ16DTdI_MDhFD1YDriABvMONxt3u-xdZVkHPPkPF1HeayGGk0M1Hi6yli3UJRh9tGC2sDbrn2Yx_SFe9y63OUXzNsEBeDTHzTE1UmGQslMz8MejW3cjmyfgFQ0ynUWiMpknfCkvTdGLcCb5vdeElv46RfJAdDLchdLA_9kqkbrq0oE1seLwSEPGAet9-x95_fjF8XQaAs33cuUcNzlqh-QvjjcQ_o"
                  />
                  <div className="h-2 w-2/3 bg-gray-200 rounded"></div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {icons.map((item, index) => (
                    <motion.div
                      key={item.key}
                      className="aspect-square bg-primary/10 rounded-xl flex items-center justify-center"
                      custom={index}
                      variants={iconVariants}
                      whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                    >
                      <span className="material-symbols-outlined text-primary">
                        {item.icon}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div className="text-center lg:text-left" variants={titleVariants}>
          <h2 className="font-display text-5xl md:text-7xl mb-8 leading-tight">
            Baixe nosso App e tenha o King Burger na palma da sua mão!
          </h2>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start items-center">
            <motion.a
              href="#"
              className="relative bg-black border border-neutral-400/60 px-5 py-3 rounded-xl flex items-center gap-3 hover:bg-neutral-900 transition text-white no-underline overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleRipple(e, 'appstore')}
            >
              {ripple?.id === 'appstore' && (
                <motion.span
                  className="absolute bg-white/30 rounded-full"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: 0,
                    height: 0,
                  }}
                  animate={{
                    width: 300,
                    height: 300,
                    x: -150,
                    y: -150,
                    opacity: [0.5, 0],
                  }}
                  transition={{ duration: 0.6 }}
                />
              )}
              <svg
                className="h-8 w-8 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left leading-tight">
                <span className="block text-[10px] md:text-xs font-normal">Disponível na</span>
                <span className="block text-base md:text-lg font-semibold">App Store</span>
              </div>
            </motion.a>
            <motion.a
              href="#"
              className="relative bg-black border border-neutral-400/60 px-5 py-3 rounded-xl flex items-center gap-3 hover:bg-neutral-900 transition text-white no-underline overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleRipple(e, 'playstore')}
            >
              {ripple?.id === 'playstore' && (
                <motion.span
                  className="absolute bg-white/30 rounded-full"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: 0,
                    height: 0,
                  }}
                  animate={{
                    width: 300,
                    height: 300,
                    x: -150,
                    y: -150,
                    opacity: [0.5, 0],
                  }}
                  transition={{ duration: 0.6 }}
                />
              )}
              <img
                alt=""
                className="h-8 w-8 flex-shrink-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApdS7YTaJe-ADhKD9BCfuBOeRWbEK3mUZXIYdr7DFHOUuS01mQGJ8xJwxNSi-e4kVYYhSToxGpDLp4T2FY3IWBGO9pl3Jmun3bgk7e_hBDnI95XQPf6TKqUbkR-wOxu6WKa_6Vi-6-hBC6jMU2EKl8AXRSpU_T9FtDnyRbfwILhqKAmmZuZagRgA9rjzSnSURi6gjBSk5cY1YiL_QrArWKc-n4IxE2Ck0uHJl3vCq7GzLB_mQjXjRh02NHhcb9eiIgDQtvgQaBylQ"
              />
              <div className="text-left leading-tight">
                <span className="block text-[10px] md:text-xs font-normal uppercase">
                  Disponível no
                </span>
                <span className="block text-base md:text-lg font-semibold">Google Play</span>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default AppSection

