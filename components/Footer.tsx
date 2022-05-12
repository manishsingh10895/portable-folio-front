import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'
import { FaCopyright } from 'react-icons/fa'

type Props = {
    shortName: string
}

export default function Footer(props: Props) {
    return (
        <Box className='safe-container' py={5}>
            <Flex justifyContent={'center'}>
                {
                    [1, 2, 3].map(i => {
                        return <Box width={2} height={2} marginX={'10px'} key={i}
                            borderRadius={'50%'}
                            background="primary.100"
                        ></Box>
                    })
                }
            </Flex>
            <Flex justify={'center'} py={4} alignItems={'center'}>
                <Icon as={FaCopyright} color="gray.300"></Icon>
                <Text color={'gray.300'} ml={1}>2022</Text>
                <Text ml={2}>{props.shortName}</Text>
            </Flex>
        </Box>
    )
}
