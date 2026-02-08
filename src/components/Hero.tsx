import { motion } from 'framer-motion'
import { useRef } from 'react'

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const titleVariants = {
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

  const baconVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: 'easeOut' as const,
      },
    },
  }

  const burgerVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: 100,
      x: i === 0 ? -100 : i === 2 ? 100 : 0,
      scale: 0.5,
    }),
    visible: (i: number) => ({
      opacity: 1,
      y: [0, -20, 0],
      x: 0,
      scale: 1,
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          delay: 0.5 + i * 0.2 + 0.8,
        },
        opacity: {
          duration: 0.8,
          delay: 0.5 + i * 0.2,
        },
        x: {
          duration: 0.8,
          delay: 0.5 + i * 0.2,
          type: 'spring' as const,
          stiffness: 100,
          damping: 10,
        },
        scale: {
          duration: 0.8,
          delay: 0.5 + i * 0.2,
          type: 'spring' as const,
          stiffness: 100,
          damping: 10,
        },
      },
    }),
  }

  const burgers = [
    {
      name: 'King Bacon Chicken',
      image: '/images/hamb1.png',
      alt: 'King Bacon Chicken Burger',
      size: 'w-64 h-64',
      order: 0,
    },
    {
      name: 'King Duplo Bacon',
      image: '/images/hamburg2.png',
      alt: 'King Duplo Bacon Burger',
      size: 'w-80 h-80',
      order: 1,
      isCenter: true,
    },
    {
      name: 'King Bacon',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuApzagIDhHj70bAJ4t6XTXqNpZfa06BERjE1aAHuACYNdLUsizWlV_YLGrYdYHzvVzf48QIf0xZIdg-xBvzyGb29xaptBFS-zWQJuLNRbrjEf8Op2djbvh4-Ffs-YzAltlfhOEgrEIu3kX8QSOEg9fubw9uqybNh-NDTQNMLl0ZkV13OSb3l4_h-4IqHXzxDdLxCiW9P3OU9dFEytKbxqaNl9UqoR-IJ0BksIk2BbxGttLuOd5-rNRzAAI5DrMfTkZCelYNftkhfI8',
      alt: 'King Bacon Original',
      size: 'w-64 h-64',
      order: 2,
    },
  ]

  // Partículas animadas
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
  }))

  return (
    <motion.section
      ref={sectionRef}
      className="hero-gradient min-h-[600px] relative overflow-hidden flex flex-col items-center justify-center text-center px-4 py-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[#0B0704] z-0" />
      
      {/* Partículas flutuantes */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-[#FBB900]/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: '100%',
            }}
            animate={{
              y: ['-100vh', '100vh'],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>
      <motion.div className="z-10 mb-8 relative" variants={titleVariants}>
        <h1 className="font-display text-white text-7xl md:text-9xl tracking-tight leading-none">
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            THE KINGS
          </motion.span>
          <motion.span
            className="block text-4xl md:text-6xl text-[#FBB900]"
            variants={baconVariants}
          >
            BACON
          </motion.span>
        </h1>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-8 md:gap-4 items-end max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
      >
        {burgers.map((burger, index) => (
          <motion.div
            key={burger.name}
            className={`group ${burger.isCenter ? '-mb-4 z-20' : ''}`}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={burgerVariants}
            whileHover={{
              scale: 1.15,
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 },
            }}
          >
            <p className="text-white font-display mb-2 text-sm md:text-xl uppercase text-center">
              {burger.name}
            </p>
            <motion.div
              className="relative"
              style={{ perspective: '1000px' }}
              whileHover={{
                rotateY: [0, 15, -15, 0],
                rotateX: [0, 10, -10, 0],
                transition: { duration: 0.6 },
              }}
            >
              <motion.img
                alt={burger.alt}
                className={`${burger.size} object-contain ${
                  burger.isCenter ? 'drop-shadow-2xl' : ''
                }`}
                src={burger.image}
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{
                  rotateZ: [0, 5, -5, 0],
                  scale: 1.1,
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

    </motion.section>
  )
}

export default Hero

