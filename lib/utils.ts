import { IconType } from 'react-icons';
import { FaFacebook, FaTwitter, FaTelegram, FaInstagram, FaGithub, FaLinkedin, FaRandom } from 'react-icons/fa';
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