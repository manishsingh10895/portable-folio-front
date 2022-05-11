import sanityClient from '@sanity/client';
import dotenv from 'dotenv'
import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config()

const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: process.env.NODE_ENV == 'production',
    apiVersion: '2021-10-21'
});

const siteId = parseInt(process.env.PORTFOLIO_SITE_ID);

const query = `*[_type=="site" && id==$siteId][0] {
    siteType,
    siteTitle,
    id,
    siteLinks,
    seo {
        description,
        keywords,
        title,
        favicon
    },
    author-> {
        name,
        shortName
    },
    heroImage,
    featuredImages,
    siteDescription,
    logo,
    primaryColor,
    secondaryColor,
    primaryBgColor,
    secondaryBgColor
}`;

const __dirname = dirname(fileURLToPath(import.meta.url));

async function getSiteDetails() {
    try {
        const siteDetails = await client.fetch(query, { siteId });
        await fs.writeFile(path.resolve(__dirname, './data/site-details.json'), JSON.stringify(siteDetails));
        return siteDetails;
    } catch (error) {
        console.error(error);
    }
}

getSiteDetails();