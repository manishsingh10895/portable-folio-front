import { Box, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head';
import React, { CSSProperties } from 'react'
import BlockContent from '@sanity/block-content-to-react';
import Layout from '../components/layout/Layout';
import siteData from '../data/site-details.json';
import sanityService from '../lib/services/sanity.service';
import { IAuthor } from '../models/author.model';

type Props = {
    authorDetails: IAuthor,
}

const serializers = {
    types: {
        block: (props: any) => {
            console.log(props);
            let styles: CSSProperties = {

            }
            styles.textAlign = 'center';
            styles.fontSize = '18px';
            styles.fontWeight='normal';

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
    const { bio, name } = props.authorDetails;
    console.log(bio);
    return (
        <div>
            <Head>
                <title> {seo.title} | Bio</title>
            </Head>
            <Layout>
                <Box
                    minH={'calc(100vh - 180px)'}
                    className='safe-container'>
                    <Heading textAlign={'center'} fontWeight='normal' fontSize={'5xl'} as="h1">
                        {name}
                    </Heading>

                    <Box paddingTop={10}>
                        <BlockContent
                            serializers={serializers}
                            blocks={bio}
                        >

                        </BlockContent>
                    </Box>
                </Box>
            </Layout>
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