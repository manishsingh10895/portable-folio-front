import { Box, Button, Flex, Grid, GridItem, Image, Stack } from '@chakra-ui/react';
import React from 'react'
import { urlFor } from '../../sanity';
import NextImage from 'next/image';
import Lightbox from 'react-image-lightbox';

type Props = {
    images: string[]
}
export default function FeaturedImages(props: Props) {
    const { images } = props;

    const [list, setList] = React.useState(images);

    const [lightboxOpen, setLightboxOpen] = React.useState(false);

    const [previewSrc, setPreviewSrc] = React.useState('');
    const [thumbSrc, setThumbSrc] = React.useState('');

    if (!list || list.length == 0) return null;
    return (
        <Stack>
            <Grid templateColumns={'repeat(3, 1fr)'}>
                {
                    list.filter(image => !!image).map((image, i) => {
                        const url = urlFor(image).height(250).width(250).url() as any;
                        const largeUrl = typeof window !== 'undefined' ? urlFor(image)
                            .width(Math.floor(window.innerWidth * 0.8))
                            .height(Math.floor(window.innerHeight * 0.8))
                            .url()
                            : '';
                        console.log('[LARGE URL]');
                        console.log(largeUrl);
                        return <GridItem key={i}>
                            <Box margin={2}>
                                <NextImage
                                    onClick={() => {
                                        setLightboxOpen(true);
                                        setPreviewSrc(largeUrl);
                                    }}
                                    width={300} height={300} src={url} alt={image['caption']} />
                            </Box>
                        </GridItem>
                    })
                }
            </Grid>

            {
                lightboxOpen && previewSrc ?
                    //@ts-ignore
                    <Lightbox
                        mainSrcThumbnail={thumbSrc}
                        mainSrc={previewSrc}
                        onCloseRequest={
                            () => {
                                setLightboxOpen(false);
                                setPreviewSrc('');
                            }
                        }
                    >
                    </Lightbox>
                    : null
            }

            <Flex justifyContent={'center'} padding={1}>
                <Button colorScheme={'secondary'}>
                    See More
                </Button>
            </Flex>
        </Stack>
    )
}
