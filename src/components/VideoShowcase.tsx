import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const VideoShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="absolute inset-0">
        <img
          src="/images/media.gif"
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div variants={itemVariants}>
          <h2 className="font-display text-white text-5xl md:text-7xl mb-6 leading-tight">
            SABOR QUE CONQUISTA
          </h2>
          <p className="text-white/90 text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            Descubra o segredo por trás do sabor irresistível do King Burger
          </p>
        </motion.div>

        <motion.div
          className="relative inline-block"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <motion.button
            onClick={handlePlay}
            className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center shadow-2xl transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(214, 35, 0, 0.7)',
                '0 0 0 20px rgba(214, 35, 0, 0)',
                '0 0 0 0 rgba(214, 35, 0, 0)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut' as const,
            }}
          >
            <motion.span
              className="material-symbols-outlined text-white text-5xl md:text-6xl"
              animate={isPlaying ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
            >
              {isPlaying ? 'pause' : 'play_arrow'}
            </motion.span>
          </motion.button>
        </motion.div>

        <motion.p
          className="text-white/70 text-sm mt-8"
          variants={itemVariants}
        >
          Clique para {isPlaying ? 'pausar' : 'reproduzir'} o vídeo
        </motion.p>
      </div>
    </motion.section>
  )
}

export default VideoShowcase

