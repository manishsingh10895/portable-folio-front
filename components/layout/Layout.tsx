import React from 'react'
import { Box, Stack } from '@chakra-ui/react';
import Header from './Header';
import { ISite } from '../../models/site.model';
import siteData from '../../data/site-details.json';
import { AssetMetadataType, SanityDocument } from '@sanity/client';
import Footer from '../Footer';

type Props = {
    children: React.ReactNode;
}

export default function Layout(props: Props) {
    const siteDetails: ISite = siteData as any;
    return (
        <Box>
            <Header />
            <Box>
                {props.children}
            </Box>
            <Footer shortName={siteDetails.author.shortName} />
        </Box>
    )
}
