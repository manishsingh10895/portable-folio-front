import { getClient } from "../sanity.server";
import fs from 'fs';
import path from 'path';

const SITE_CACHE_PATH = '.site';

async function fetchSiteData() {
    try {
        const query = (`*[ _type == "site"]`);
        const data = await getClient().fetch(query);

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export default async function getSiteData() {
    let cachedData

    try {
        cachedData = JSON.parse(
            fs.readFileSync(path.join(__dirname, SITE_CACHE_PATH), 'utf8')
        )
    } catch (error) {
        console.log('Member cache not initialized')
    }

    if (!cachedData) {
        const data = fetchSiteData()

        try {
            fs.writeFileSync(
                path.join(__dirname, SITE_CACHE_PATH),
                JSON.stringify(data),
                'utf8'
            )
        } catch (error) {
            console.log('ERROR WRITING MEMBERS CACHE TO FILE')
            console.log(error)
        }

        cachedData = data
    }

    return cachedData
}