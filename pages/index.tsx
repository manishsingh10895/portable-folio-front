import fs from 'fs';
import path from 'path';
import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Layout from '../components/layout/Layout'
import { ISite } from '../models/site.model'
import styles from '../styles/Home.module.scss'
import { SITE_CACHE_PATH } from '../lib/constants';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { urlFor } from '../sanity';
import NextImage from 'next/image';
import FeaturedImages from '../components/Home/FeaturedImages';
import siteData from '../data/site-details.json';
import getSiteData from '../lib/fetchTheme';
import sanityService from '../lib/services/sanity.service';
import HomeSection from '../components/Home/HomeSection';
import Contact from '../components/Home/Contact';
import AnimateInViewBox from '../components/AnimateInViewBox';
import LayoutAnimated from '../components/layout/LayoutAnimated';

type Props = {
  siteDetails: Partial<ISite>
}

const Home: NextPage<Props> = (props: Props) => {
  const { siteDetails } = props;
  const heroImage = siteDetails.heroImage ? urlFor(props.siteDetails.heroImage as string).height(500).url() : "";

  return (
    <div className={styles.container}>
      <Head>
        <title>{props.siteDetails.seo?.title}</title>
        <meta name="description" content={props.siteDetails.seo?.description} />
        <meta name="keywords" content={props.siteDetails.seo?.keywords.join(', ')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutAnimated>
        <Flex alignItems={'center'} flexDirection='column'
          justifyContent="center" width={'100%'} >
          <Box className={styles.heroImageContainer}>
            <Image height={'350px'} src={heroImage} alt="heroImage" />
          </Box>

          <Heading as="h4">
            {props.siteDetails.siteTitle}
          </Heading>
          <Text margin="5" fontSize={'xl'} fontWeight='normal'>
            {props.siteDetails.siteDescription}
          </Text>

          <AnimateInViewBox>
            <Box className='safe-container'>
              <FeaturedImages images={props.siteDetails.featuredImages as any} />
            </Box>
          </AnimateInViewBox>

          <Box py={20} className='safe-container'>
            <AnimateInViewBox>
              <HomeSection blocks={props.siteDetails.home?.sections} />
            </AnimateInViewBox>
          </Box>
          <Box py={20} className='safe-container'>
            <AnimateInViewBox>
              <Contact author={props.siteDetails.author as any} />
            </AnimateInViewBox>
          </Box>
        </Flex>
      </LayoutAnimated>
    </div>
  )
}

function fetchLocalSiteDetails(): Partial<ISite> {
  let filePath = path.resolve(SITE_CACHE_PATH);
  const data = siteData;
  return data as any;
}

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const siteData = await sanityService.fetchProductionSiteDetails();

    return {
      props: {
        siteDetails: siteData
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default Home
