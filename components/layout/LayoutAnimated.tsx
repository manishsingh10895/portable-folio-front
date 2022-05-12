import React from 'react'
import { motion } from 'framer-motion';

const variants = {
    hidden: { opacity: 0, x: -20, y: 0, scale: 0.98 },
    enter: {
        opacity: 1, x: 0, y: 0, scale: 1,
    },
    exit: { opacity: 0, x: 0, y: -50, scale: 0 },
}

export default function LayoutAnimated({ children }) {
    return (
        <motion.main
            initial='hidden'
            animate='enter'
            exit='exit'
            variants={variants}
            transition={{ type: 'spring' }}
        >
            {children}
        </ motion.main>
    )
}
