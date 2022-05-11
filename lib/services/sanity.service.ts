import fs from 'fs';
import path from 'path';
import { ISite } from '../../models/site.model';
import { getClient } from '../../sanity.server';
import { SITE_CACHE_PATH } from '../constants';

class SanityService {
    fetchLocalSiteDetails(): Partial<ISite> {
        let filePath = path.resolve(SITE_CACHE_PATH);
        const data = fs.readFileSync(filePath);
        let string = data.toString('utf-8');
        let siteDetails = JSON.parse(string);

        return siteDetails;
    }

    async fetchGalleryDetails(): Promise<any> {
        try {
            const query = `*[_type=="gallery" && site->id==$siteId][0] {
                id,
                title,
                subtitle,
                images,
                site-> {
                    id,
                    seo,
                    author->{
                        name,
                        shortName
                    }
                }
            }`;
            const siteId = process.env.PORTFOLIO_SITE_ID ? parseInt(process.env.PORTFOLIO_SITE_ID) : 1;
            console.log(siteId);
            const data = await getClient().fetch(query, { siteId });
            return data;
        } catch (err) {
            throw err;
        }
    }

    async fetchProductionSiteDetails(): Promise<ISite> {
        try {
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
                    shortName,
                    image,
                    slug,
                    socials,
                    email,
                    phone,
                    address
                },
                home->{
                    sections
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

            const siteId = process.env.PORTFOLIO_SITE_ID ? parseInt(process.env.PORTFOLIO_SITE_ID) : 1;
            console.log(siteId);
            const data = await getClient().fetch(query, { siteId });

            console.log(['SITE DATA']);
            console.log(data);

            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default new SanityService();