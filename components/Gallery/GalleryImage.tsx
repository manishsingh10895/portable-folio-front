import { Box, chakra, Image, Text, useBreakpoint, useMediaQuery } from '@chakra-ui/react'
import React, { useState } from 'react'
import useResize from '../../lib/hooks/useResize';
import { urlFor } from '../../sanity';
import styles from './GalleryImage.module.scss';
import { isValidMotionProp, motion, MotionStyle, MotionTransform, MotionValue, Variants } from 'framer-motion';
import NextImage from 'next/image';
type Props = {
    image: any,
    onClick: (previewUrl: string, caption: string) => void,
    columnCount: number,
    maintainAspectRatio?: boolean,
}

const Figure = chakra('figure', {
    shouldForwardProp: () => true
});

const MotionBox = chakra(motion.div, {
    // shouldForwardProp: isValidMotionProp
});

export default function GalleryImage(props: Props) {
    const { image } = props;

    const thumbWidth = 250;

    const dim = image?.details?.metadata?.dimensions;
    let h = thumbWidth, w = thumbWidth;

    let H, W;
    if (typeof window != 'undefined') {
        H = window.innerHeight * 0.8, W = window.innerWidth * 0.8
    } else {
        H = 1000, W = 1000;
    }
    if (dim && dim.aspectRatio) {
        h = Math.floor(w / dim.aspectRatio);
    }
    if (props.maintainAspectRatio == false) {
        h = thumbWidth;
    }
    if (dim && dim.height && dim.width && dim.aspectRatio) {
        W = Math.floor(H * dim.aspectRatio);
    }
    let url: any = urlFor(image)
        .height(h).width(w)
    // .fit('min')
    // .rect(0, 0, dim.width, dim.height);

    url = url.url();

    const largeUrl = typeof window !== 'undefined' ? urlFor(image)
        .width(Math.floor(W))
        .height(Math.floor(H))
        .url()
        : '';

    const captionMotion: Variants = {
        initial: { opacity: 0, y: 50, },
        hover: { opacity: 1, y: 0, },
        exit: { opacity: 0, y: 50 },
    }

    const containerStyles = props.maintainAspectRatio == false ? {
        margin: '0.5rem',
    } : {}

    return (
        <MotionBox
            initial="initial"
            animate="initial"
            display="table"
            width={props.maintainAspectRatio == false ? 'auto' : '100%'}
            className={styles.imageContainer}
            style={{
                pageBreakInside: "avoid",
                breakInside: "avoid-column",
                marginBottom: "1rem",
                ...containerStyles
            }}
            whileHover="hover"
        >
            <Figure position={'relative'}
                style={{
                    overflow: 'hidden'
                }}
            >
                <Image
                    cursor={'pointer'}
                    boxShadow={'lg'}
                    onClick={() => {
                        props.onClick(largeUrl, image.Caption);
                    }}
                    // loading="lazy"
                    w={props.maintainAspectRatio == false ? w : '100%'}
                    h={props.maintainAspectRatio == false ? h : 'auto'}
                    src={url} alt={image['caption']} />
                {
                    image.Caption && props.columnCount > 1 ?
                        <motion.div
                            transition={{
                                easings: 'easeInOut'
                            }}
                            variants={captionMotion}
                            className={styles.captionContainer}>
                            <Box className={styles.captionOverlay}
                                onClick={() => {
                                    props.onClick(largeUrl, image.Caption)
                                }}
                            ></Box>
                            <Box
                                // boxShadow={'lg'}
                                paddingY={'1'}
                                onClick={() => {
                                    props.onClick(largeUrl, image.Caption)
                                }}
                                className={props.columnCount == 1 ? styles.captionContainerMobile : styles.captionContainer}
                            >
                                <Text textAlign={'center'}
                                    fontSize="20px"
                                    color="white"
                                    pt={1}>
                                    {image.Caption}
                                </Text>
                            </Box>
                        </motion.div> : null
                }
                {
                    image.Caption && props.columnCount == 1 ?
                        <Box
                            // boxShadow={'lg'}
                            paddingY={'1'}
                            borderBottomLeftRadius={'lg'}
                            borderBottomRightRadius={'lg'}
                            className={props.columnCount == 1 ? styles.captionContainerMobile : styles.captionContainer}
                        >
                            <Text textAlign={'center'}
                                fontSize="20px"
                                pt={1}>
                                {image.Caption}
                            </Text>
                        </Box> : null
                }
            </Figure>
        </MotionBox>
    )
}
