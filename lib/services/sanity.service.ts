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

    async fetchAuthorDetails(): Promise<any> {
        try {
            const query = `*[_type=="site" && id==$siteId][0] {
                author-> {
                    name,
                    shortName,
                    image,
                    slug,
                    socials,
                    email,
                    phone,
                    bio,
                    address
                }                
            }`

            const siteId = process.env.PORTFOLIO_SITE_ID ? parseInt(process.env.PORTFOLIO_SITE_ID) : 1;

            const data = await getClient().fetch(query, { siteId });

            if (data.author) return data.author;

            return data;
        } catch (error) {
            throw error;
        }
    }

    async fetchGalleryDetails(): Promise<any> {
        try {
            const query = `*[_type=="gallery" && site->id==$siteId][0] {
                id,
                title,
                subtitle,
                "images": images[]{
                    ...,
                    'details': asset-> {
                        metadata,
                        ...
                    }
                },
                "collections": collections[]->{
                    description,
                    _id,
                    slug,
                    name,
                    'images': images[0..2] {
                        ...,
                        Caption,
                        'details': asset -> {
                        metadata,
                        ...
                    }
                  }
                },
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

            const data = await getClient().fetch(query, { siteId });

            const collections = data.collections;

            if (collections && collections.length) {
                let _ids = collections.map(c => c._id);

                const collectionImageLengthQuery = `*[_type=="imageCollection" && _id in $collections] {
                    _id,
                    "imageCount": length(images)
                }`

                const _countData = await getClient().fetch(collectionImageLengthQuery, { collections: _ids });
                console.log(_countData);
                collections.forEach(c => {
                    const _count = _countData.find(d => d._id === c._id);
                    if (_count) c.imageCount = _count.imageCount;
                })
            }

            console.log('COLLECTIONS DATA');
            collections.forEach((c) => {
                console.log(c.images);
            })

            return data;
        } catch (err) {
            throw err;
        }
    }

    async fetchCollectionDetails(slug: string): Promise<any> {
        const query = `
        *[_type=="imageCollection" && slug.current==$slug] {
            description,
            _id,
            slug,
            name,
            'images': images[] {
                ...,
                Caption,
                'details': asset -> {
                    metadata,
                    ...
               }
            }
        }
        `

        const data = await getClient().fetch(query, { slug: slug });
        console.log(`${slug} Collection Data`);
        console.log(data);

        if (data && data.length) {
            return data[0];
        }

        return null;
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
            const data = await getClient().fetch(query, { siteId });


            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default new SanityService();