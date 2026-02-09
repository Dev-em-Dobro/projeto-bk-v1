import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const HeroPromo = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 45])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 70])

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
      className="relative min-h-[90vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Camada de fundo com parallax (move mais devagar que o scroll) */}
      <motion.div
        className="absolute left-0 right-0 top-0 z-0 h-[120%] w-full bg-[#000000]"
        style={{ y: backgroundY }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Lado esquerdo - Informações (parallax) */}
          <motion.div className="text-white" variants={itemVariants} style={{ y: contentY }}>
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
            </motion.div>
          </motion.div>

          {/* Lado direito - Imagem do hambúrguer (parallax) */}
          <motion.div
            className="relative flex justify-center items-center"
            variants={imageVariants}
            style={{ y: imageY }}
          >
            <div className="relative">
              <img
                src="/images/hero-burguer-gif.gif"
                alt="KB Ninja Combo"
                className="w-full max-w-lg md:max-w-xl drop-shadow-2xl"
                style={{ width: '90%', height: 'auto' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Confira mais - fixo no final da hero, rola para a próxima seção */}
      <motion.button
        type="button"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white font-display font-normal text-sm hover:text-[#00A859] transition"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth' })
        }}
        aria-label="Rolar para a próxima seção"
      >
        <span>Confira mais</span>
        <motion.span
          className="material-symbols-outlined"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const }}
        >
          expand_more
        </motion.span>
      </motion.button>
    </motion.section>
  )
}

export default HeroPromo

