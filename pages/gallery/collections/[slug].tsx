import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import useResize from '../../../lib/hooks/useResize';
import sanityService from '../../../lib/services/sanity.service';
import { IImageCollection } from '../../../models/image-collection.model';
import siteData from '../../../data/site-details.json';
import Head from 'next/head';
import LayoutAnimated from '../../../components/layout/LayoutAnimated';
import Lightbox from 'react-image-lightbox';
import { getImagePreviewUrl } from '../../../lib/utils';
import GalleryImage from '../../../components/Gallery/GalleryImage';

type Props = {
    isMobile: boolean,
    collection: IImageCollection,
}

export default function Collection(props: Props) {
    const { collection } = props;
    const { height, width } = useResize(props.isMobile);

    const columnCount = props.isMobile ? 1 : Math.min(Math.floor(width / 300), 3);

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [previewSrc, setPreviewSrc] = useState('');

    const seo = siteData.seo;

    const [imageIndex, setImageIndex] = useState(0);

    const [list, setList] = useState(props.collection.images);

    if (!props.collection) {
        return <Flex
            width={'100%'}
            height={'450px'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Text>
                No collection found
            </Text>
        </Flex>;
    }
    console.log(imageIndex);
    return (
        <Box>
            <Head>
                <title>{seo?.title} | {props.collection.slug?.current}</title>
            </Head>

            <LayoutAnimated>
                <Box>
                    <Text py={2} fontWeight="bold" textAlign={'center'} fontSize={'2xl'}>
                        {collection.name}
                    </Text>

                    <Text fontSize={'md'} py={2}
                        textAlign="center">
                        {collection.description}
                    </Text>
                </Box>


                <Box className="safe-container" paddingTop={10}>
                    <Box style={{
                        columnCount: Math.min(Math.floor(width / 300), 3),
                        columnGap: '1rem',
                    }} >
                        {
                            list.map((image, i) => {
                                return <GalleryImage key={i} image={image}
                                    columnCount={columnCount}
                                    onClick={(previewUrl, caption) => {
                                        // setPreviewCaption(caption);
                                        setLightboxOpen(true);
                                        setPreviewSrc(previewUrl);
                                        setImageIndex(i);
                                    }}
                                />
                            })
                        }
                    </Box>
                    {
                        lightboxOpen && previewSrc ?
                            //@ts-ignore
                            <Lightbox
                                imageCaption={list[(imageIndex) % list.length].Caption}
                                // mainSrcThumbnail={thumbSrc}
                                nextSrc={getImagePreviewUrl(list[(imageIndex + 1) % list.length])}
                                prevSrc={getImagePreviewUrl(list[(imageIndex + list.length - 1) % list.length])}
                                mainSrc={getImagePreviewUrl(list[imageIndex])}
                                onCloseRequest={
                                    () => {
                                        setLightboxOpen(false);
                                        setPreviewSrc('');
                                    }
                                }
                                onMoveNextRequest={() => {
                                    setImageIndex((imageIndex + 1) % list.length);
                                }}
                                onMovePrevRequest={() => {
                                    setImageIndex((imageIndex + list.length - 1) % list.length);
                                }}
                            >
                            </Lightbox>
                            : null
                    }
                </Box>
            </LayoutAnimated>
        </Box>
    )
}

export const getServerSideProps = async (context) => {

    let slug = context.query.slug;

    const collectionData = await sanityService.fetchCollectionDetails(slug);

    return {
        props: {
            collection: collectionData
        },

    }
}