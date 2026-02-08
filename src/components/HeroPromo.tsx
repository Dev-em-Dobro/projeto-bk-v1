import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const HeroPromo = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut' as const,
      },
    },
  }

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  }

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-[90vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#191512] via-[#191512] to-[#191512]"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Background GIF */}
      {/* <div className="absolute inset-0 opacity-20">
        <img
          src="/images/hero-burguer-gif.gif"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-[#00A859]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut' as const,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Lado esquerdo - Informações */}
          <motion.div className="text-white" variants={itemVariants}>
            <motion.div
              className="inline-block bg-[#00A859] text-white font-display px-6 py-2 rounded-full text-lg md:text-xl mb-6"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{
                type: 'spring' as const,
                stiffness: 200,
                delay: 0.3,
              }}
            >
              NOVA PROMOÇÃO
            </motion.div>
            
            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight"
              variants={itemVariants}
            >
              <span className="block text-[#00A859]">KB NINJA</span>
              <span className="block">CHEGOU!</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed"
              variants={itemVariants}
            >
              Nosso novo combo especial com brinde exclusivo das{' '}
              <span className="font-bold text-[#00A859]">Tartarugas Ninja</span>!
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.button
                className="bg-[#00A859] text-white px-10 py-4 rounded-full font-display text-xl hover:bg-[#00C96B] transition transform hover:scale-105 shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={pulseAnimation}
              >
                Quero Meu Combo!
              </motion.button>
              
              <motion.button
                className="flex items-center justify-center gap-2 text-white font-display text-lg hover:text-[#00A859] transition"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span animate={pulseAnimation}>Confira mais</motion.span>
                <motion.span
                  className="material-symbols-outlined"
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut' as const,
                  }}
                >
                  expand_more
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Lado direito - Imagem do hambúrguer */}
          <motion.div
            className="relative flex justify-center items-center"
            variants={imageVariants}
          >
            <div className="relative">
              <img
                src="/images/hero-burguer-gif.gif"
                alt="KB Ninja Combo"
                className="w-full max-w-lg md:max-w-xl drop-shadow-2xl"
                style={{ width: '90%', height: 'auto' }}
              />
            </div>

            {/* Decoração - Tartarugas Ninja */}
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32 opacity-20"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <img
                src="/images/tartarugas.png"
                alt="Tartarugas Ninja"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default HeroPromo

