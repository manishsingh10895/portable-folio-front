import { Box } from '@chakra-ui/react'
import React from 'react'

export default function Dots({ count }) {
    return (
        <>
            {
                [...Array(count)].map((i, index) => {
                    return <Box width={2} height={2} marginX={'10px'} key={index}
                        borderRadius={'50%'}
                        background="primary.100"
                    ></Box>
                })
            }
        </>
    )
}
