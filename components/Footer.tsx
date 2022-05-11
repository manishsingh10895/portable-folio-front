import { Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { FaCopyright } from 'react-icons/fa'

type Props = {
    shortName: string
}

export default function Footer(props: Props) {
    return (
        <Flex className='safe-container' py={4} alignItems={'center'}>
            <Icon as={FaCopyright} color="gray.300"></Icon>
            <Text color={'gray.300'} ml={1}>2022</Text>
            <Text ml={2}>{props.shortName}</Text>
        </Flex>
    )
}
