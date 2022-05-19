import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { FaCopyright } from 'react-icons/fa'
import Dots from './Dots'

type Props = {
    shortName: string
}

export default function Footer(props: Props) {
    return (
        <Box className='safe-container' py={5}>
            <Flex justifyContent={'center'}>
                <Dots count={3} />
            </Flex>
            <Flex justify={'center'} py={4} alignItems={'center'}>
                <Icon as={FaCopyright} color="gray.300"></Icon>
                <Text color={'gray.300'} ml={1}>2022</Text>
                <Text ml={2}>{props.shortName}</Text>
            </Flex>
        </Box>
    )
}
