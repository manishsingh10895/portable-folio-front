import { Box, Button, ChakraProps, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Stack, Textarea, useToast } from '@chakra-ui/react'
import React, { CSSProperties, useState } from 'react'
import { PhoneIcon, } from '@chakra-ui/icons';

type Props = {
    authorEmail: string
}

export default function ContactForm(props: Props) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const toast = useToast();
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

    function sendMessage() {
        if (!!email && !!message && !!name) {
            let _message = encodeURIComponent(message);
            window.open(`mailto:${props.authorEmail}
            ?subject=Hi I'm ${name} and I would like to connect with you
            &body=${_message}`, '_blank'
            );
        } else {
            toast({
                title: 'Error',
                description: 'Please fill all the fields',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
    }

    function handleOnChange(e) {
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'message':
                setMessage(e.target.value);
                break;
            case 'name':
                setName(e.target.value);
                break;
        }
    }

    return (
        <Box minW={'320px'}>
            <Stack>
                <FormControl my={2}>
                    <FormLabel {...labelStyles} htmlFor="name">Name</FormLabel>
                    <Input
                        onChange={handleOnChange}
                        {...inputStyles} id="name" type="text"
                        name="name"
                    >
                    </Input>
                </FormControl>
                <FormControl my={2}>
                    <FormLabel {...labelStyles}>Your Email</FormLabel>
                    <Input {...inputStyles}
                        onChange={handleOnChange}
                        name="email"
                        id="email" type="email" />
                </FormControl>

                <FormControl my={2}>
                    <FormLabel {...labelStyles}>Your Message</FormLabel>
                    <Textarea name="message"
                        onChange={handleOnChange}
                        resize={'none'} draggable="false"  {...inputStyles} id="message" rows={5} />
                </FormControl>

                <Box py={4}>
                    <Button
                        onClick={sendMessage}
                        colorScheme={'primary'}>
                        Send Message
                    </Button>
                </Box>
            </Stack>
        </Box>
    )
}
