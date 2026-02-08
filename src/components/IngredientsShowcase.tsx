import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const IngredientsShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const ingredients = [
    {
      name: 'Carne Premium',
      description: '100% Angus',
      icon: '🍔',
      color: 'from-red-600 to-red-800',
    },
    {
      name: 'Bacon Crocante',
      description: 'Temperado artesanalmente',
      icon: '🥓',
      color: 'from-amber-600 to-amber-800',
    },
    {
      name: 'Queijo Derretido',
      description: 'Cheddar especial',
      icon: '🧀',
      color: 'from-yellow-500 to-yellow-700',
    },
    {
      name: 'Pão Artesanal',
      description: 'Feito na hora',
      icon: '🍞',
      color: 'from-amber-400 to-amber-600',
    },
    {
      name: 'Alface Fresca',
      description: 'Selecionada diariamente',
      icon: '🥬',
      color: 'from-green-500 to-green-700',
    },
    {
      name: 'Tomate Selecionado',
      description: 'Da fazenda para você',
      icon: '🍅',
      color: 'from-red-500 to-red-700',
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.section
      ref={sectionRef}
      className="bg-accent py-24 relative overflow-hidden"
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
            INGREDIENTES PREMIUM
          </h2>
          <p className="text-secondary/70 text-xl max-w-2xl mx-auto">
            Selecionamos apenas os melhores ingredientes para garantir o sabor inigualável
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.name}
              className="group relative"
              custom={index}
              variants={cardVariants}
              whileHover={{
                y: -20,
                scale: 1.1,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className={`bg-gradient-to-br ${ingredient.color} rounded-3xl p-8 text-center shadow-2xl cursor-pointer h-full flex flex-col items-center justify-center relative overflow-hidden`}
                whileHover={{
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                }}
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: 'easeInOut' as const,
                  }}
                >
                  {ingredient.icon}
                </motion.div>
                <h3 className="font-display text-white text-lg md:text-xl mb-2">
                  {ingredient.name}
                </h3>
                <p className="text-white/80 text-sm">{ingredient.description}</p>
                
                {/* Efeito de brilho no hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default IngredientsShowcase

