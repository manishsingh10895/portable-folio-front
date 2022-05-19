import { Box, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import sanityService from "../lib/services/sanity.service";
import { IGallery } from "../models/gallery.model";
import { useState } from "react";
import Lightbox from 'react-image-lightbox';
import LayoutAnimated from "../components/layout/LayoutAnimated";
import siteData from '../data/site-details.json';
import GalleryImage from "../components/Gallery/GalleryImage";
import useResize from "../lib/hooks/useResize";
import { getImagePreviewUrl } from "../lib/utils";
import ImageCollection from "../components/Gallery/ImageCollection/ImageCollection";
import Dots from "../components/Dots";

type Props = {
    galleryDetails: IGallery,
    isMobile: boolean,
}

const Gallery: NextPage<Props> = (props: Props) => {
    const { site, title, subtitle, images, collections } = props.galleryDetails;
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [previewSrc, setPreviewSrc] = useState('');
    const [thumbSrc, setThumbSrc] = useState('');
    const seo = siteData.seo;
    const [list, setList] = useState(images.filter(image => !!image));
    const [previewCaption, setPreviewCaption] = useState('');

    const { height, width } = useResize(props.isMobile);

    const [imageIndex, setImageIndex] = useState(0);

    const columnCount = props.isMobile ? 1 : Math.min(Math.floor(width / 300), 3);

    return (
        <div>
            <Head>
                <title> {seo?.title} | Gallery</title>
            </Head>
            <LayoutAnimated>
                <Box>
                    <Text py={2} fontWeight="bold" textAlign={'center'} fontSize={'2xl'}>
                        {title}
                    </Text>
                    <Text py={2} textAlign="center" fontSize={'xl'}>
                        {subtitle}
                    </Text>
                </Box>

                <Box className="safe-container" py={20}>
                    {
                        collections.map((c, i) => {
                            return (
                                <ImageCollection key={i}
                                    collection={c}
                                    isMobile={props.isMobile}
                                />
                            )
                        })
                    }
                </Box>
                <Flex justifyContent={'center'}>
                    <Dots count={3} />
                </Flex>
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
                                        setPreviewCaption(caption);
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
                                mainSrcThumbnail={thumbSrc}
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
                                    setImageIndex((imageIndex + list.length - 1) % list.length);
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
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const galleryData = await sanityService.fetchGalleryDetails();
    const UA = context.req.headers['user-agent'];
    const isMobile = Boolean(UA.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ));

    console.log(galleryData.images.length);

    return {
        props: {
            galleryDetails: galleryData,
            isMobile
        }
    }
}

export default Gallery;