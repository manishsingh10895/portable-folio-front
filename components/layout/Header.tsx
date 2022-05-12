import { ChakraProps, Flex, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { ISite, SiteLink } from '../../models/site.model'
import Logo from '../Logo'
import siteData from '../../data/site-details.json';
import { useRouter } from 'next/router'

type Props = {

}

export default function Header(props: Props) {
    const siteDetails: ISite = siteData as any;
    const router = useRouter();

    let activeStyles: (url: string) => ChakraProps = (url) => {
        if (url == router.pathname) {
            return {
                color: "primary.500",
                fontWeight: 'bold',
                borderBottom: '1px solid',
                borderBottomColor: 'primary.800'
            }
        }
        return {};
    }

    return (
        <Flex padding={'20px 0'} flexDirection={'column'} w="100%" alignItems={'center'} justifyContent="center">
            <NextLink passHref href={'/'}>
                <Link>
                    <Logo logo={siteDetails.logo} />
                </Link>
            </NextLink>
            <Flex py={4}>
                {
                    siteDetails.siteLinks?.map(s => {
                        return <NextLink
                            className={router.pathname == s.url ? 'active' : ''}
                            key={s.url}
                            href={s.url}
                            passHref>
                            <Link
                                {...activeStyles(s.url)}
                                _hover={{
                                    textDecoration: "none",
                                    color: "secondary.100"
                                }}
                                padding="4px 8px">
                                {s.title}
                            </Link>
                        </NextLink>
                    })
                }
            </Flex>
        </Flex>
    )
}
