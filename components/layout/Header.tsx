import { Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { ISite, SiteLink } from '../../models/site.model'
import Logo from '../Logo'
import siteData from '../../data/site-details.json';

type Props = {

}

export default function Header(props: Props) {
    const siteDetails: ISite = siteData as any;

    return (
        <Flex padding={'20px 0'} flexDirection={'column'} w="100%" alignItems={'center'} justifyContent="center">
            <Logo logo={siteDetails.logo} />
            <Flex>
                {
                    siteDetails.siteLinks?.map(s => {
                        return <NextLink
                            key={s.url}
                            href={s.url}
                            passHref>
                            <Link padding="4px 8px">
                                {s.title}
                            </Link>
                        </NextLink>
                    })
                }
            </Flex>
        </Flex>
    )
}
