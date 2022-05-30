import { Box, chakra } from '@chakra-ui/react'
import { Variants } from 'framer-motion';
import Image from 'next/image';
import React from 'react'
import { urlFor } from '../../../sanity';

type Props = {
    image: any,
    onClick: (previewUrl: string, caption: string) => void,
    columnCount: number,
    maintainAspectRatio?: boolean,
}

const Figure = chakra('figure', {
    shouldForwardProp: () => true
});

const NextImage = chakra(Image, {
    shouldForwardProp: () => true
});

const FigCaption = chakra('figcaption', {
    shouldForwardProp: () => true
});

export default function CollectionPreviewImage(props: Props) {
    const { image } = props;
    const thumbWidth = 300;

    console.log(image);


    let url: any = urlFor(image);
    // .height(h).width(w)
    // .fit('min')
    // .rect(0, 0, dim.width, dim.height);

    url = url.url();

    const captionMotion: Variants = {
        initial: { opacity: 0, y: 50, },
        hover: { opacity: 1, y: 0, },
        exit: { opacity: 0, y: 50 },
    }

    return (
        <Box flex="1"
            maxW={'450px'}
            minW={{ base: '100%', sm: '100%', md: "250px", lg: "250px" }}
            position={'relative'} minHeight={thumbWidth}
            marginBottom={'1rem'}
            marginLeft={{ base: 0, sm: '1rem' }}
            borderRadius={'lg'}
            boxShadow={'0px 3px 26px 0px rgba(201,197,201,0.82)'}
        // overflow="hidden"
        >
            <Box
                borderRadius={'lg'}
                overflow="hidden"
                position={'relative'}
                height={'100%'} width="100%">
                <NextImage
                    src={url}
                    objectFit="cover"
                    layout='fill'
                    onLoadingComplete={() => {

                    }}
                />
            </Box>
            {
                image.Caption ?
                    <Box>
                        <FigCaption
                            paddingY={1}
                            textAlign={'center'}>
                            {image.Caption}
                        </FigCaption>
                    </Box> : null
            }
        </Box >
    )
}
