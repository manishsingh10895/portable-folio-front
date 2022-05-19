import dotenv from 'dotenv';
import { createClient } from 'next-sanity';
dotenv.config();
const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
    useCdn: process.env.NODE_ENV === "production",
    apiVersion: '2021-10-21',
    token: process.env.SANITY_TOKEN,
}

const sanityClient = createClient(config);

export const getClient = () => sanityClient;