import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.3 + i * 0.1,
        type: 'spring' as const,
        stiffness: 200,
      },
    }),
  }

  const socialLinks = [
    { icon: 'star', key: 'star' },
    { icon: 'photo_camera', key: 'camera' },
    { icon: 'share', key: 'share' },
  ]

  return (
    <motion.footer
      ref={footerRef}
      className="bg-background-dark text-accent py-16 border-t border-white/10"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          className="text-primary font-display text-3xl mb-10 flex justify-center items-center gap-2"
          variants={itemVariants}
        >
          <motion.span
            className="material-symbols-outlined text-4xl"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            restaurant
          </motion.span>
          KING BURGER
        </motion.div>
        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-12 text-sm font-bold uppercase tracking-wider"
          variants={itemVariants}
        >
          <a className="hover:text-primary transition" href="#">
            App KB
          </a>
        </motion.div>
        <div className="flex justify-center gap-6 mb-12">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.key}
              className="bg-white/10 p-3 rounded-full hover:bg-primary transition"
              href="#"
              custom={index}
              variants={socialVariants}
              whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="material-symbols-outlined text-2xl">{link.icon}</span>
            </motion.a>
          ))}
        </div>
        <motion.p
          className="text-accent/50 text-xs max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Sujeito à disponibilidade em estoque. Imagens meramente ilustrativas. TM & © 2024 King
          Burger Company LLC. Usado sob licença. Todos os direitos reservados.
        </motion.p>
      </div>
    </motion.footer>
  )
}

export default Footer

