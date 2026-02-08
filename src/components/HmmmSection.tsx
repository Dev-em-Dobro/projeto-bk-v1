import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const HmmmSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [displayedText, setDisplayedText] = useState('')
  const fullText = 'HMMMM'

  useEffect(() => {
    if (isInView) {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, 150)
      return () => clearInterval(interval)
    }
  }, [isInView, fullText])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.5, rotateX: -15, rotateY: 5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.8,
      },
    },
  }

  const tiltAnimation = {
    rotateX: [0, 2, -2, 0],
    rotateY: [0, -2, 2, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  }

  const features = [
    {
      icon: '🌶️',
      title: 'Tempero Especial',
      description: 'Nossa receita secreta',
    },
    {
      icon: '🔥',
      title: 'Crocante Perfeito',
      description: 'Frito na hora',
    },
    {
      icon: '✨',
      title: '100% Frango',
      description: 'Ingredientes premium',
    },
  ]

  const stats = [
    { number: '12', label: 'Unidades' },
    { number: '100%', label: 'Satisfação' },
    { number: '5min', label: 'Preparo' },
  ]

  return (
    <motion.section
      ref={sectionRef}
      className="bg-gradient-to-br from-primary via-[#3a1a0f] to-primary py-24 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#FBB900]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut' as const,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Título */}
        <motion.div className="text-center mb-16" variants={textVariants}>
          <h2 className="font-display text-white text-7xl md:text-9xl mb-6 tracking-tighter opacity-90">
            {displayedText}
            {displayedText.length < fullText.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                |
              </motion.span>
            )}
          </h2>
          <motion.p
            className="text-white/80 font-display text-2xl md:text-3xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 }}
          >
            Saboroso em cada detalhe
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Imagem do produto */}
          <div className="flex justify-center order-2 lg:order-1">
            <motion.div
              className="relative inline-block group"
              variants={imageVariants}
              style={{ perspective: '1000px' }}
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-[#FBB900]/20 to-[#FBB900]/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut' as const,
                }}
              />
              <motion.img
                alt="Crispy Chicken Nuggets"
                className="relative rounded-3xl shadow-2xl max-w-full md:max-w-lg"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlTOx_r_EA0YqUjIL8jrBsVh9dBJsDW6o7Bq7Y7-bw6GBNY-bdB6VftDN6uQ0EVNale9HTVy86f2ut0pvWfvUUoaHAX6MxrBQtwGTUrKrcyFaDbu8mei8gbzPbjW5tq7AMTqdWNzTMyzI0eIYHw-X6uViC3XA-ZgXLq2iAATdPx8rTmX8o5ZPZ4M3lIvLTwpv7PtBon7SZXTyZRJcc0TsSDQc6Gc_CFYdlXcuMtI9ZYrIw6qkOqrFfTI9gZhha294qdJD4YsfZ7JQ"
                animate={tiltAnimation}
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </div>

          {/* Conteúdo do lado direito */}
          <motion.div
            className="text-white order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="font-display text-4xl md:text-5xl mb-6 text-[#FBB900]">
              Crispy Chicken Nuggets
            </h3>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Crocantes por fora, suculentos por dentro. Nossos nuggets são feitos
              com peito de frango selecionado e temperados com nossa receita especial.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <h4 className="font-display text-lg mb-1">{feature.title}</h4>
                  <p className="text-sm text-white/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-8 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 1.2 + index * 0.2,
                    type: 'spring' as const,
                    stiffness: 200,
                  }}
                >
                  <div className="font-display text-4xl md:text-5xl text-[#FBB900] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Botão */}
            <motion.div
              className="flex justify-center lg:justify-start"
              variants={buttonVariants}
            >
              {/* <motion.button
                className="bg-white text-primary px-10 py-4 rounded-full font-display text-xl shadow-xl cursor-pointer whitespace-nowrap"
                initial={{ x: '-50%' }}
                animate={{
                  x: 0,
                  scale: [1, 1.05, 1],
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: '#FBB900',
                  color: '#502314',
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut' as const,
                  },
                }}
              >
                Ver Mais
              </motion.button> */}
            </motion.div>
          </motion.div>
        </div>

        {/* Seção adicional com cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5 }}
        >
          {[
            {
              title: 'Tempero Único',
              description: 'Nossa receita secreta com 12 especiarias selecionadas',
              icon: '🌶️',
            },
            {
              title: 'Crocância Perfeita',
              description: 'Frito na hora para garantir a textura ideal',
              icon: '🔥',
            },
            {
              title: 'Qualidade Premium',
              description: '100% peito de frango, sem conservantes artificiais',
              icon: '✨',
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-center border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.7 + index * 0.2 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderColor: 'rgba(251, 185, 0, 0.5)',
              }}
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              >
                {card.icon}
              </motion.div>
              <h4 className="font-display text-xl mb-2 text-[#FBB900]">
                {card.title}
              </h4>
              <p className="text-white/80 text-sm">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HmmmSection

