import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

interface VideoItem {
  id: number
  title: string
  thumbnail: string
  video?: string
  gif?: string
  description: string
}

const BehindTheScenes = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)

  const videos: VideoItem[] = [
    {
      id: 1,
      title: 'Preparação do Hambúrguer',
      thumbnail: '/images/hamb1.png',
      gif: '/images/tartarugas1.gif',
      description: 'Veja como preparamos nosso hambúrguer artesanal',
    },
    {
      id: 2,
      title: 'Cozinha King Burger',
      thumbnail: '/images/hamburg2.png',
      gif: '/images/media.gif',
      description: 'Um dia na nossa cozinha',
    },
    {
      id: 3,
      title: 'Ingredientes Frescos',
      thumbnail: 'https://via.placeholder.com/400x300?text=Ingredientes',
      description: 'Seleção diária de ingredientes premium',
    },
    {
      id: 4,
      title: 'Equipe em Ação',
      thumbnail: 'https://via.placeholder.com/400x300?text=Equipe',
      description: 'Nossa equipe preparando seu pedido',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  }

  return (
    <>
      <motion.section
        ref={sectionRef}
        className="bg-background-light py-24 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-secondary text-5xl md:text-7xl mb-6">
              POR TRÁS DOS BASTIDORES
            </h2>
            <p className="text-secondary/70 text-xl max-w-2xl mx-auto">
              Conheça o processo de criação dos nossos produtos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className="group relative cursor-pointer"
                custom={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedVideo(video.id)}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-secondary">
                  {video.gif ? (
                    <img
                      src={video.gif}
                      alt={video.title}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                    <h3 className="font-display text-white text-2xl mb-2">{video.title}</h3>
                    <p className="text-white/80 text-sm">{video.description}</p>
                  </div>

                  {/* Play button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-4xl">
                        play_arrow
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Modal de vídeo */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 text-white text-4xl hover:text-primary transition"
                onClick={() => setSelectedVideo(null)}
              >
                ×
              </button>
              {videos.find((v) => v.id === selectedVideo)?.gif && (
                <img
                  src={videos.find((v) => v.id === selectedVideo)?.gif}
                  alt={videos.find((v) => v.id === selectedVideo)?.title}
                  className="w-full rounded-2xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default BehindTheScenes

