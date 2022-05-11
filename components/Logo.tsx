import { Image } from '@chakra-ui/react';
import React from 'react'
import { urlFor } from '../sanity';

export default function Logo({ logo }) {
    if (!logo) {
        return null;
    }
    
    const logoUrl = urlFor(logo).height(50).width(50).url();

    return (
        <Image src={logoUrl} width={50} height={50} alt="Portfolio Logo" />
    )
}
