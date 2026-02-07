import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const PromoSection = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const cardRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
    const cardInView = useInView(cardRef, { once: true, amount: 0.3 })
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

    const [number2, setNumber2] = useState(0)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (isInView) {
        // Animação do número 2
        const timer2 = setTimeout(() => {
            let current = 0
            const duration = 1000
                const steps = duration / 16
                const stepValue = 2 / steps

                const interval = setInterval(() => {
                    current += stepValue
                    if (current >= 2) {
                        setNumber2(2)
                        clearInterval(interval)
                    } else {
                        setNumber2(current)
                    }
                }, 16)
            }, 300)

        // Animação do preço
        const timerPrice = setTimeout(() => {
            let current = 0
            const duration = 1500
                const steps = duration / 16
                const stepValue = 25 / steps

                const interval = setInterval(() => {
                    current += stepValue
                    if (current >= 25) {
                        setPrice(25)
                        clearInterval(interval)
                    } else {
                        setPrice(current)
                    }
                }, 16)
            }, 600)

            return () => {
                clearTimeout(timer2)
                clearTimeout(timerPrice)
            }
        }
    }, [isInView])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut' as const,
            },
        },
    }

    const cardVariants = {
        hidden: { opacity: 0, x: 100, scale: 0.8 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                type: 'spring' as const,
                stiffness: 100,
                damping: 15,
            },
        },
    }

    const burgerCardVariants = {
        hidden: { opacity: 0, scale: 0.5, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: i * 0.15,
                type: 'spring' as const,
                stiffness: 100,
                damping: 12,
            },
        }),
    }

    const burgers = [
        {
            name: 'Chicken Duplo',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDoWmu9YnDZM3hBRvxEXDkYXTNWzqZQqbJ1kGPzAzU0VuWwwkVZPT_ekBl_lHKeed8KDfM12kq4w-rB6EgnsbUOxN96O5odsl4rbQsZNfsmVF7TByZ_JVDib4GkMQHKr0DzUPTOosEpMwb8t6zQbbjytM9vhA1nVC8jXQg7vObYZbS1kxWWVDI1ODq984m_2HmqNM7BsCEcjxTS1jihf4SN8CBXNjBH3ywxiDnwC-sCsQsbWNVEo0LoHFc54zbpHJXbtpVohwYhOuI',
            alt: 'Chicken Duplo',
        },
        {
            name: 'Stacker Duplo Bacon',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDaUQtckCdDplgEsXcVWSlPQwFqoClfm7l0V8QqY07VmnqE8jtFWHiHpO6PUT-jSWVVv2KMZbX5osjlpEZl-M5C_55wuNXgOTj_LamK0KpVxtD9CUAKOhzKVd-9oUH4VENqDakUXouF6E8RiChOZ5hJIByAbIz1SqKVn14EUJNkfYby8ZJS2Mq_hrt15buOzcH3NuX1EwK043lQmyfX0PfQZcvJPY1E5zF0fnxXFePN1La4SVQpFWlwZQW4Z9zJKUy9fblVH7Axnbc',
            alt: 'Stacker Duplo Bacon',
        },
        {
            name: 'Rodeio Duplo',
            image:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDPLHptTuxCxllIGxzLIKEUNvH6RnHq0_Gfyn9L5g5B_zEv2ad2KiBOg6qrzKlzQzY3Fz7qW5_P3sbrSddxpn6kRbcg6NzuxUQaztJZkq2rfCKxDHiYkhevoFTerf2q5LqpmltcGQYVsA-dsfd72a8BPoVvkkldhta9jK8Cxvjd9YQkz5ux5_PKj-euYE5QV82djtJdrfUlhhH_eP-JlLdHhdpX9EzqJCFslk-BAXSpE8Y1JJ3G2N8UjujJUjo49HIp-W6QCVqjj4E',
            alt: 'Rodeio Duplo',
        },
    ]

    return (
        <motion.section
            ref={sectionRef}
            className="relative min-h-[700px] flex items-center overflow-hidden bg-secondary"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
                <img
                    alt="Close-up of burger held by hands"
                    className="w-full h-full object-cover object-center"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBoDh_gpX8Q09E6Yi5mXr2hfRDRyTaxXcjgh8d_2pPssgjxo7lxccGn41XLOARw95Xabl-ewRQ1EfhL3TOQ90NITd_1cM7iHYmDxBD_qKIhNGgbUOX6W3j_VRyCt4-Q-QFRh5gqNKVWBiVHh2aE9ZG5OfEVBVeE3abuTS9c_VpxS9xyg902wPkMyOMji0Yd9sdKlR-9NpKprZP-XWgatQdrXcS3pWKsDWxf2T_EWIZcTTOovC6ekttgHZipJyjua0fhtMF4LBV_8s"
                />
                <div className="absolute inset-0 promo-overlay"></div>
            </motion.div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-12">
                    <motion.div
                        className="max-w-xl text-center md:text-left"
                        variants={containerVariants}
                    >
                        <motion.div className="mb-6" variants={itemVariants}>
                            <h3 className="font-display text-white text-4xl md:text-5xl drop-shadow-lg leading-none">
                                KING EM DOBRO
                            </h3>
                        </motion.div>
                        <motion.div
                            className="flex items-baseline justify-center md:justify-start text-white"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="font-display text-8xl md:text-[10rem] leading-none"
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.3,
                                    type: 'spring',
                                    stiffness: 200,
                                }}
                            >
                                {Math.floor(number2)}
                            </motion.div>
                            <div className="ml-4 flex flex-col justify-center text-left">
                                <span className="font-display text-5xl md:text-6xl leading-none">BURGERS</span>
                                <span className="font-display text-2xl md:text-3xl leading-none">
                                    A PARTIR DE
                                </span>
                            </div>
                        </motion.div>
                        <motion.div
                            className="flex items-start justify-center md:justify-start text-white mt-4"
                            variants={itemVariants}
                        >
                            <span className="font-display text-4xl md:text-5xl mt-4">R$</span>
                            <motion.span
                                className="font-display text-9xl md:text-[12rem] leading-none"
                                animate={{
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.6,
                                }}
                            >
                                {Math.floor(price)}
                            </motion.span>
                            <span className="font-display text-4xl md:text-5xl mt-4">,90</span>
                        </motion.div>
                        <motion.p
                            className="text-white/80 text-[10px] mt-6 italic uppercase tracking-wider max-w-md mx-auto md:mx-0"
                            variants={itemVariants}
                        >
                            Os preços promocionais são válidos por tempo indeterminado. Confira as unidades
                            participantes. Imagens meramente ilustrativas.
                        </motion.p>
                    </motion.div>
                    <motion.div
                        ref={cardRef}
                        className="bg-white/95 backdrop-blur-sm p-8 rounded-[2rem] shadow-2xl max-w-md w-full mb-10"
                        variants={cardVariants}
                        initial="hidden"
                        animate={cardInView ? 'visible' : 'hidden'}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.3 },
                        }}
                    >
                        <p className="font-display text-secondary text-2xl mb-8 text-center uppercase">
                            ESCOLHA ENTRE:
                        </p>
                        <div className="grid grid-cols-3 gap-6">
                            {burgers.map((burger, index) => (
                                <motion.div
                                    key={burger.name}
                                    className="group cursor-pointer flex flex-col items-center"
                                    custom={index}
                                    variants={burgerCardVariants}
                                    initial="hidden"
                                    animate={cardInView ? 'visible' : 'hidden'}
                                    whileHover={{
                                        scale: 1.15,
                                        transition: { duration: 0.3 },
                                    }}
                                >
                                    <motion.div
                                        className="w-full aspect-square bg-accent rounded-2xl p-2 border-2 border-transparent"
                                        whileHover={{
                                            boxShadow: '0 0 30px rgba(214, 35, 0, 0.5)',
                                            borderColor: 'rgba(214, 35, 0, 0.3)',
                                            transition: { duration: 0.3 },
                                        }}
                                    >
                                        <img
                                            alt={burger.alt}
                                            className="w-full h-full object-contain"
                                            src={burger.image}
                                        />
                                    </motion.div>
                                    <p className="text-[10px] font-bold text-center mt-3 text-secondary uppercase leading-tight h-8 flex items-center justify-center">
                                        {burger.name}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}

export default PromoSection

