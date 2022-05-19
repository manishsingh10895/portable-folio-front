import React, { useEffect } from 'react'
import { motion, isValidMotionProp, useAnimation } from 'framer-motion';
import { chakra, cookieStorageManager } from '@chakra-ui/react';
import { CustomChakraComponentProps } from '../lib/types';
import { useInView } from 'react-intersection-observer'

const ChakraAnimatedDiv = chakra(motion.div, {
    shouldForwardProp: () => true,
});

export default function AnimateInViewBox(props: CustomChakraComponentProps) {
    const variants = {
        visible: { opacity: 1, transition: { duration: 0.5 }, translateY: 0 },
        hidden: { opacity: 0, translateY: '50%' }
    }
    const controller = useAnimation();
    const [ref, inView] = useInView();
    const { children, ...rest } = props;

    useEffect(() => {
        if (inView) {
            controller.start('visible');
        }
    }, [controller, inView]);
    
    return (
        <ChakraAnimatedDiv
            ref={ref}
            initial="hidden"
            animate={controller}
            variants={variants}
            className="animate-in-view-box"
            {...rest}
        >
            {props.children}
        </ChakraAnimatedDiv>
    )
}
