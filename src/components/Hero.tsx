import { motion } from 'framer-motion'

const Hero = () => {
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
        ease: 'easeOut',
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
        ease: 'easeOut',
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
          ease: 'easeInOut',
          delay: 0.5 + i * 0.2 + 0.8,
        },
        opacity: {
          duration: 0.8,
          delay: 0.5 + i * 0.2,
        },
        x: {
          duration: 0.8,
          delay: 0.5 + i * 0.2,
          type: 'spring',
          stiffness: 100,
          damping: 10,
        },
        scale: {
          duration: 0.8,
          delay: 0.5 + i * 0.2,
          type: 'spring',
          stiffness: 100,
          damping: 10,
        },
      },
    }),
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 1.2,
      },
    },
  }

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
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

  return (
    <motion.section
      className="hero-gradient min-h-[600px] relative overflow-hidden flex flex-col items-center justify-center text-center px-4 py-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="z-10 mb-8" variants={titleVariants}>
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
        className="flex flex-wrap justify-center gap-8 md:gap-4 items-end max-w-7xl mx-auto"
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
            <motion.img
              alt={burger.alt}
              className={`${burger.size} object-contain ${
                burger.isCenter ? 'drop-shadow-2xl' : ''
              }`}
              src={burger.image}
              whileHover={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="mt-12" variants={buttonVariants}>
        <motion.button
          className="flex flex-col items-center text-white font-bold gap-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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
              ease: 'easeInOut',
            }}
          >
            expand_more
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.section>
  )
}

export default Hero

