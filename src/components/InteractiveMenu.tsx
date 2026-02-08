import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

interface MenuItem {
  id: number
  name: string
  description: string
  price: string
  image: string
  category: string
}

const InteractiveMenu = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  const categories = ['all', 'burgers', 'bebidas', 'acompanhamentos']

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'King Bacon',
      description: 'Hambúrguer com bacon crocante, queijo cheddar e molho especial',
      price: 'R$ 25,90',
      image: '/images/hamb1.png',
      category: 'burgers',
    },
    {
      id: 2,
      name: 'King Duplo',
      description: 'Dois hambúrgueres, queijo, alface, tomate e molho especial',
      price: 'R$ 32,90',
      image: '/images/hamburg2.png',
      category: 'burgers',
    },
    {
      id: 3,
      name: 'Refrigerante',
      description: 'Coca-Cola, Pepsi ou Guaraná gelado',
      price: 'R$ 8,90',
      image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop',
      category: 'bebidas',
    },
    {
      id: 4,
      name: 'Batata Frita',
      description: 'Batata frita crocante com molho especial',
      price: 'R$ 12,90',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop',
      category: 'acompanhamentos',
    },
    {
      id: 5,
      name: 'King Chicken',
      description: 'Frango crocante com molho especial e alface',
      price: 'R$ 22,90',
      image: '/images/hamb1.png',
      category: 'burgers',
    },
    {
      id: 6,
      name: 'Bacon',
      description: 'Bacon crocante e saboroso',
      price: 'R$ 14,90',
      image: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=400&h=400&fit=crop',
      category: 'acompanhamentos',
    },
  ]

  const filteredItems =
    selectedCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, rotateY: -180 },
    visible: {
      opacity: 1,
      rotateY: 0,
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
      className="bg-secondary py-24 relative overflow-hidden"
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
          <h2 className="font-display text-white text-5xl md:text-7xl mb-6">
            NOSSO MENU
          </h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12">
            Explore nossos deliciosos produtos
          </p>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-6 py-3 rounded-full font-display text-lg uppercase transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white scale-110'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  selectedCategory === category
                    ? {
                        boxShadow: '0 0 20px rgba(214, 35, 0, 0.5)',
                      }
                    : {}
                }
              >
                {category === 'all' ? 'Todos' : category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Cards do menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative h-80"
              style={{ perspective: '1000px' }}
              custom={index}
              variants={cardVariants}
              onMouseEnter={() => setFlippedCard(item.id)}
              onMouseLeave={() => setFlippedCard(null)}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{
                  rotateY: flippedCard === item.id ? 180 : 0,
                }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Frente do card */}
                <div
                  className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-2xl"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="w-full h-full bg-white rounded-3xl p-6 flex flex-col items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-48 h-48 object-contain mb-4"
                    />
                    <h3 className="font-display text-secondary text-2xl mb-2">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Verso do card */}
                <div
                  className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-2xl bg-primary"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="w-full h-full p-6 flex flex-col items-center justify-center text-white">
                    <h3 className="font-display text-3xl mb-4">{item.name}</h3>
                    <p className="text-center mb-6 text-white/90">{item.description}</p>
                    <div className="font-display text-4xl text-[#FBB900]">{item.price}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default InteractiveMenu

