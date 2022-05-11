import { Box } from '@chakra-ui/react'
import React from 'react'
import styles from './Envelope.module.scss';

export default function Envelope() {
    return (
        <Box className={styles.envelope}>
            <Box className={styles.paper}></Box>
        </Box>
    )
}
