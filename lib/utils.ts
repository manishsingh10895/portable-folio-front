import { IconType } from 'react-icons';
import { FaFacebook, FaTwitter, FaTelegram, FaInstagram, FaGithub, FaLinkedin, FaRandom } from 'react-icons/fa';
import { urlFor } from '../sanity';
export const getIconFromSocial = (social: string): IconType => {
    switch (social) {
        case 'facebook': return FaFacebook;
        case 'twitter': return FaTwitter;
        case 'telegram': return FaTelegram;
        case 'instagram': return FaInstagram;
        case 'github': return FaGithub;
        case 'linkedin': return FaLinkedin;
    }

    return FaRandom;
}

export const getImagePreviewUrl = (image: any) => {
    const dim = image?.details?.metadata?.dimensions;

    let H, W;
    if (typeof window != 'undefined') {
        H = window.innerHeight * 0.8, W = window.innerWidth * 0.8
    } else {
        H = 1000, W = 1000;
    }

    if (dim && dim.height && dim.width && dim.aspectRatio) {
        W = Math.floor(H * dim.aspectRatio);
    }

    const largeUrl = typeof window !== 'undefined' ? urlFor(image)
        .width(Math.floor(W))
        .height(Math.floor(H))
        .url() : '';

    return largeUrl;

}