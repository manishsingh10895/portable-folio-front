import { Box, Button, ChakraProps, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Stack, Textarea } from '@chakra-ui/react'
import React, { CSSProperties, useState } from 'react'
import { PhoneIcon, } from '@chakra-ui/icons';

type Props = {

}

export default function ContactForm(props: Props) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

    const labelStyles: ChakraProps = {
        fontSize: 'sm',
        fontWeight: 'normal',
        color: "gray.400"
    }

    const inputStyles: ChakraProps = {
        border: 'none',
        background: 'gray.100',
        borderRadius: '3xl'
    }

    return (
        <Box minW={'320px'}>
            <Stack>
                <FormControl my={2}>
                    <FormLabel {...labelStyles} htmlFor="name">Name</FormLabel>
                    <Input {...inputStyles} id="name" type="text">
                    </Input>
                </FormControl>
                <FormControl my={2}>
                    <FormLabel {...labelStyles}>Your Email</FormLabel>
                    <Input {...inputStyles} id="email" type="email" />
                </FormControl>

                <FormControl my={2}>
                    <FormLabel {...labelStyles}>Your Message</FormLabel>
                    <Textarea resize={'none'} draggable="false"  {...inputStyles} id="message" rows={5} />
                </FormControl>

                <Box py={4}>
                    <Button colorScheme={'primary'}>
                        Send Message
                    </Button>
                </Box>
            </Stack>
        </Box>
    )
}
