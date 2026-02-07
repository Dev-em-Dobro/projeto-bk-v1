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
        type: 'spring',
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
        type: 'spring',
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
      ease: 'easeInOut',
    },
  }

  return (
    <motion.section
      ref={sectionRef}
      className="bg-primary py-24 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display text-white text-7xl md:text-9xl mb-12 tracking-tighter opacity-90">
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
        <motion.div
          className="relative inline-block group"
          variants={imageVariants}
          style={{ perspective: '1000px' }}
        >
          <motion.img
            alt="Crispy Chicken Nuggets"
            className="rounded-3xl shadow-2xl max-w-full md:max-w-4xl"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlTOx_r_EA0YqUjIL8jrBsVh9dBJsDW6o7Bq7Y7-bw6GBNY-bdB6VftDN6uQ0EVNale9HTVy86f2ut0pvWfvUUoaHAX6MxrBQtwGTUrKrcyFaDbu8mei8gbzPbjW5tq7AMTqdWNzTMyzI0eIYHw-X6uViC3XA-ZgXLq2iAATdPx8rTmX8o5ZPZ4M3lIvLTwpv7PtBon7SZXTyZRJcc0TsSDQc6Gc_CFYdlXcuMtI9ZYrIw6qkOqrFfTI9gZhha294qdJD4YsfZ7JQ"
            animate={tiltAnimation}
            whileHover={{ scale: 1.05 }}
          />
          <motion.div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-primary px-10 py-4 rounded-full font-display text-2xl shadow-xl cursor-pointer"
            variants={buttonVariants}
            whileHover={{
              scale: 1.1,
              backgroundColor: '#502314',
              color: 'white',
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            Ver Mais
          </motion.div>
        </motion.div>
        <motion.p
          className="text-white font-display text-3xl mt-12"
          variants={textVariants}
        >
          Saboroso em cada detalhe
        </motion.p>
      </div>
    </motion.section>
  )
}

export default HmmmSection

