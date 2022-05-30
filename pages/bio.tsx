import { Box, Heading, Text, Image } from '@chakra-ui/react'
import Head from 'next/head';
import React, { CSSProperties } from 'react'
import BlockContent from '@sanity/block-content-to-react';
import Layout from '../components/layout/Layout';
import siteData from '../data/site-details.json';
import sanityService from '../lib/services/sanity.service';
import { IAuthor } from '../models/author.model';
import NextImage from 'next/image';
import { urlFor } from '../sanity';
import LayoutAnimated from '../components/layout/LayoutAnimated';

type Props = {
    authorDetails: IAuthor,
}

const serializers = {
    types: {
        block: (props: any) => {
            let styles: CSSProperties = {

            }
            styles.textAlign = 'center';
            styles.fontSize = '18px';
            styles.fontWeight = 'normal';

            switch (props.node.style) {
                case 'h3': {
                    styles.fontSize = '28px';
                    styles.fontWeight = 'bold';
                }
            }

            return <Text paddingTop={4} paddingBottom={4} style={styles}>
                {props.children}
            </Text>;
        }
    }
}

export default function bio(props: Props) {
    const seo = siteData.seo;
    const { bio, name, image } = props.authorDetails;

    return (
        <div>
            <Head>
                <title> {seo.title} | Bio</title>
            </Head>
            <LayoutAnimated>
                <Box
                    minH={'calc(100vh - 180px)'}
                    className='safe-container'>
                    <Heading textAlign={'center'} fontWeight='normal' fontSize={'5xl'} as="h1">
                        {name}
                    </Heading>

                    <Box py={10} width='100%' >
                        <Box position={'relative'} width={'auto'} overflow="hidden" maxW="350px" borderRadius={'32px'} height={'350px'} margin='0 auto' boxShadow='md'>
                            <NextImage layout='fill' objectFit='cover' src={urlFor(image).url()} alt={name}></NextImage>
                        </Box>
                    </Box>

                    <Box paddingTop={10}>
                        <BlockContent
                            serializers={serializers}
                            blocks={bio}
                        >

                        </BlockContent>
                    </Box>
                </Box>
            </LayoutAnimated>
        </div>
    )
}

export const getServerSideProps = async () => {
    const authorDetails = await sanityService.fetchAuthorDetails();
    return {
        props: {
            authorDetails
        }
    }
}