import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Slide {
  title: string
  image?: string
  video?: string
  alt: string
  hasOrangeClass?: boolean
}

const slides: Slide[] = [
  {
    title: 'O PODER NINJA CHEGOU AO KB!',
    video: '/images/tartarugas1.mp4',
    alt: 'King Jr Tartarugas Ninja - Donatello',
  },
  {
    title: 'O PODER NINJA CHEGOU AO BK!',
    video: '/images/media.mp4',
    alt: 'King Jr Tartarugas Ninja - Leonardo',
    hasOrangeClass: true,
  },
]

const NinjaCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalSlides = slides.length

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(((index % totalSlides) + totalSlides) % totalSlides)
  }, [totalSlides])

  const next = useCallback(() => {
    setCurrentSlide((prev) => ((prev + 1) % totalSlides))
  }, [totalSlides])

  const prev = useCallback(() => {
    setCurrentSlide((prev) => ((prev - 1 + totalSlides) % totalSlides))
  }, [totalSlides])

  const stopAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current)
      autoplayIntervalRef.current = null
    }
  }, [])

  const startAutoplay = useCallback(() => {
    stopAutoplay()
    autoplayIntervalRef.current = setInterval(next, 5000)
  }, [next, stopAutoplay])

  useEffect(() => {
    startAutoplay()
    return () => {
      stopAutoplay()
    }
  }, [startAutoplay, stopAutoplay])

  return (
    <section
      className="ninja-gradient min-h-[80vh] md:min-h-[85vh] py-16 md:py-20 relative overflow-hidden w-full"
      aria-roledescription="carousel"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="ninja-carousel w-full h-full relative overflow-hidden">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => {
            if (index !== currentSlide) return null
            return (
              <motion.div
                key={index}
                className={`ninja-carousel-slide min-w-full flex-shrink-0 w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4 md:px-0 ${
                  slide.hasOrangeClass ? 'ninja-slide-orange' : ''
                }`}
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
              >
                <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
                  <motion.div
                    className="md:w-1/2 text-white text-center md:text-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="inline-block bg-[#FFD100] text-secondary font-display px-6 py-2 rounded-lg text-xl mb-6">
                      KIDS MENU
                    </div>
                    <h2 className="font-display text-5xl md:text-7xl mb-6 leading-tight uppercase">
                      {slide.title}
                    </h2>
                    <p className="text-xl md:text-2xl font-bold mb-8 opacity-90">
                      Peça seu King Jr. e colecione os brinquedos das Tartarugas Ninja!
                    </p>
                    <button className="bg-white text-[#004D2C] px-10 py-4 rounded-full font-display text-xl hover:bg-primary hover:text-white transition transform hover:scale-105">
                      Quero Meu King Jr.
                    </button>
                  </motion.div>
                  <motion.div
                    className="md:w-1/2 relative"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 100 }}
                  >
                    {slide.video ? (
                      <video
                        className="w-full h-auto drop-shadow-2xl rounded-lg"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source src={slide.video} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        alt={slide.alt}
                        className="w-full h-auto drop-shadow-2xl hover:scale-110 transition duration-500"
                        src={slide.image}
                      />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      <motion.button
        type="button"
        className="ninja-carousel-prev absolute left-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/40 hover:bg-white/60 text-white flex items-center justify-center text-2xl md:text-3xl font-bold transition focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#004D2C] focus:outline-none"
        aria-label="Slide anterior"
        onClick={() => {
          stopAutoplay()
          prev()
          setTimeout(startAutoplay, 100)
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        ‹
      </motion.button>
      <motion.button
        type="button"
        className="ninja-carousel-next absolute right-5 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/40 hover:bg-white/60 text-white flex items-center justify-center text-2xl md:text-3xl font-bold transition focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#004D2C] focus:outline-none"
        aria-label="Próximo slide"
        onClick={() => {
          stopAutoplay()
          next()
          setTimeout(startAutoplay, 100)
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        ›
      </motion.button>
      <div className="absolute bottom-0 left-0 right-0 py-3 bg-secondary/90">
        <div className="flex justify-center gap-2" role="tablist" aria-label="Slides do carrossel">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              type="button"
              className={`ninja-carousel-dot w-2.5 h-2.5 rounded-sm bg-secondary transition focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-secondary focus:outline-none hover:opacity-80 ${
                index === currentSlide ? 'ninja-dot-active' : ''
              }`}
              aria-label={`Slide ${index + 1} de ${totalSlides}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
              data-index={index}
              onClick={() => {
                stopAutoplay()
                goToSlide(index)
                setTimeout(startAutoplay, 100)
              }}
              animate={
                index === currentSlide
                  ? {
                      scale: [1, 1.3, 1],
                      transition: {
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 200,
                      },
                    }
                  : {}
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NinjaCarousel

