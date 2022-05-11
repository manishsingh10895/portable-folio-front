import { createClient } from "next-sanity";
import { sanityConfig } from "./sanity";

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(sanityConfig);

export const previewClient = createClient({
    ...sanityConfig,
    useCdn: false,
    token: process.env.SANITY_TOKEN,
    apiVersion: '2021-10-21'
});

export const getClient = (userPreview: boolean = false) => {
    return userPreview ? previewClient : sanityClient;
}