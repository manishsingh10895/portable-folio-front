import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import sanityService from "../lib/services/sanity.service";
import { IGallery } from "../models/gallery.model";
import { ISite } from "../models/site.model";
import NextImage from 'next/image';
import { urlFor } from "../sanity";
import { useState } from "react";
import Lightbox from 'react-image-lightbox';

type Props = {
    galleryDetails: IGallery
}

const Gallery: NextPage<Props> = (props: Props) => {
    const { site, title, subtitle, images } = props.galleryDetails;
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [previewSrc, setPreviewSrc] = useState('');
    const [thumbSrc, setThumbSrc] = useState('');

    const [list, setList] = useState(images);
    const [previewCaption, setPreviewCaption] = useState('');
    console.log(props.galleryDetails);
    return (
        <div>
            <Head>
                <title> {site.seo?.title} | Gallery</title>
            </Head>
            <Layout>
                <Box>
                    <Text py={2} fontWeight="bold" textAlign={'center'} fontSize={'2xl'}>
                        {title}
                    </Text>
                    <Text py={2} textAlign="center" fontSize={'xl'}>
                        {subtitle}
                    </Text>
                </Box>

                <Box className="safe-container" paddingTop={10}>
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
                                return <GridItem key={i}
                                    _hover={{
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Box margin={2}>
                                        <NextImage
                                            onClick={() => {
                                                setPreviewCaption(image['Caption']);
                                                setLightboxOpen(true);
                                                setPreviewSrc(largeUrl);
                                            }}
                                            width={300} height={300} src={url} alt={image['caption']} />
                                        {
                                            image.Caption ?
                                                <Text textAlign={'center'} pt={1}>
                                                    {image.Caption}
                                                </Text> : null
                                        }
                                    </Box>
                                </GridItem>
                            })
                        }
                    </Grid>
                    {
                        lightboxOpen && previewSrc ?
                            <Lightbox
                                imageCaption={previewCaption}
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
                </Box>
            </Layout>
        </div>
    )
}

export const getServerSideProps = async () => {
    const galleryData = await sanityService.fetchGalleryDetails();

    return {
        props: {
            galleryDetails: galleryData
        }
    }
}

export default Gallery;