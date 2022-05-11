import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { IAuthor } from '../../models/author.model'
import Envelope from '../ui/Envelope'
import ContactForm from './ContactForm'
import { FaEnvelope, FaEnvelopeOpen, FaLocationArrow, FaPhone } from 'react-icons/fa';

type Props = {
    author: IAuthor
}

export default function Contact(props: Props) {

    const { address, email, phone } = props.author;
    const flexStyles = {
        alignItems: 'center',
        marginTop: '15px',
        marginBottom: '15px'
    }
    const iconStyles = {
        color: 'gray.300'
    }
    const textStyles = {
        color: "gray.500",
        ml: 2
    }
    return (
        <Flex flexWrap={'wrap'} justifyContent='space-around' width={'100%'}>
            <Box>
                <Text fontSize={'4xl'}>
                    Contact
                </Text>
                <Stack marginTop={5}>
                    <Flex style={{ ...flexStyles }}>
                        <Icon {...iconStyles} as={FaLocationArrow}></Icon>
                        <Text {...textStyles}>
                            {address}
                        </Text>
                    </Flex>

                    <Flex style={{ ...flexStyles }}>
                        <Icon {...iconStyles} as={FaEnvelopeOpen}></Icon>
                        <Text {...textStyles}>
                            {email}
                        </Text>
                    </Flex>

                    <Flex style={{ ...flexStyles }}>
                        <Icon {...iconStyles} as={FaPhone}></Icon>
                        <Text {...textStyles}>
                            {phone}
                        </Text>
                    </Flex>
                </Stack>
            </Box>
            <Box marginLeft={{
                sm: '0',
                lg: "10"
            }}>
                <ContactForm />
            </Box>
        </Flex>
    )
}
