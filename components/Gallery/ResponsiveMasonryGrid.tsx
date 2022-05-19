import { Box, useBreakpoint } from '@chakra-ui/react'
import React, { forwardRef, useRef } from 'react'
import useResize from '../../lib/hooks/useResize'
import { CustomChakraComponentProps } from '../../lib/types';

type Props = CustomChakraComponentProps;

export default function ResponsizeMasonryGrid(props: Props) {
    const { width } = useResize();
    const { children, ...rest } = props;
    const columnCount = Math.min(Math.floor(width / 300), 3);

    return (
        <Box
            style={{
                columnCount: columnCount,
                columnGap: '1rem',
            }}
            {...rest}
        >
            {
                children
            }
        </Box>
    )
}