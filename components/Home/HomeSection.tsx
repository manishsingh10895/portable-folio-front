import { Box, pseudoPropNames, Text, Image } from '@chakra-ui/react'
import { SanityDocument } from '@sanity/client'
import React, { CSSProperties } from 'react'
import BlockContent from '@sanity/block-content-to-react';
import styles from './HomeSection.module.scss';
import { urlFor } from '../../sanity';
type Props = {
    blocks: any
}

export default function HomeSection(props: Props) {
    const serializers = {
        types: {
            image: (props: any) => {
                const url = urlFor(props.node.asset) as any;
                return <Image my={10} src={url} alt="asdasd"></Image>;
            },
            block: (props: any) => {
                let styles: CSSProperties = {

                }
                styles.textAlign = 'center';
                styles.fontSize = '20px';

                switch (props.node.style) {
                    case 'h3': {
                        styles.fontSize = '28px';
                        styles.fontWeight = 'bold';
                    }
                }

                return <Text paddingTop={1} paddingBottom={1} style={styles}>
                    {props.children}
                </Text>;
            }
        }
    }
    return (
        <Box className={styles.homeSectionContainer} paddingTop={2} paddingBottom={2}>
            <BlockContent
                projectId="34l3kdkb"
                dataset="production"
                serializers={serializers}
                blocks={props.blocks}
            >
            </BlockContent>
        </Box>
    )
}
