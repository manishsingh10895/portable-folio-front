import { Box, Heading, Text } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { IImageCollection } from '../../../models/image-collection.model'
import AnimateInViewBox from '../../AnimateInViewBox'
import GalleryImage from '../GalleryImage'
import ResponsiveMasonryGrid from '../ResponsiveMasonryGrid'
import Lightbox from 'react-image-lightbox';
import useResize from '../../../lib/hooks/useResize'
import { getImagePreviewUrl } from '../../../lib/utils'

type Props = {
    collection: IImageCollection,
    isMobile: boolean
}

export default function ImageCollection(props: Props) {
    const { collection } = props;
    const { width } = useResize();

    const columnCount = props.isMobile ? 1 : Math.min(Math.floor(width / 300), 3);

    const [lightboxOpen, setLightboxOpen] = React.useState(false);

    const [imageIndex, setImageIndex] = React.useState(0);
    const list = collection.images;

    return (
        <AnimateInViewBox py={10}>
            <Box width={'fit-content'}>
                <Text fontSize={'2xl'}

                >
                    {collection.name}
                </Text>
                <Box width="100%" h={'1px'} background="primary.200" ></Box>
            </Box>
            <Text fontSize={'md'} color="gray.400"
                paddingTop={2}
            >
                {collection.description}
            </Text>

            <ResponsiveMasonryGrid marginTop={10}>
                {
                    list.map((image, index) => {
                        // return <Box key={index}></Box>
                        return <GalleryImage
                            image={image}
                            key={index}
                            columnCount={columnCount}
                            onClick={() => {
                                // setPreviewCaption(caption);
                                setLightboxOpen(true);
                                // setPreviewSrc(previewUrl);
                                setImageIndex(index);
                            }}
                        />
                    })
                }
            </ResponsiveMasonryGrid>

            {
                lightboxOpen ?
                    //@ts-ignore
                    <Lightbox
                        imageCaption={list[(imageIndex) % list.length].Caption}
                        nextSrc={getImagePreviewUrl(list[(imageIndex + 1) % list.length])}
                        prevSrc={getImagePreviewUrl(list[(imageIndex + list.length - 1) % list.length])}
                        mainSrc={getImagePreviewUrl(list[imageIndex])}
                        onCloseRequest={
                            () => {
                                setLightboxOpen(false);
                            }
                        }
                        onMoveNextRequest={() => {
                            setImageIndex((imageIndex + list.length - 1) % list.length);
                        }}
                        onMovePrevRequest={() => {
                            setImageIndex((imageIndex + list.length - 1) % list.length);
                        }}
                    >
                    </Lightbox>
                    : null
            }
        </AnimateInViewBox>
    )
}
