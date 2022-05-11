import { Author, IAuthor } from "./author.model";
import { IHome } from "./home.model";
import { ISeo } from "./seo.interface";

export interface ISite {
    id: number,
    author: Author,
    home: IHome,
    siteType: string,
    seo: ISeo,
    heroImage: string,
    siteTitle: string,
    siteDescription: string,
    primaryColor: string,
    secondaryColor: string,
    primaryBgColor: string,
    secondaryBgColor: string,
    logo: string,
    featuredImages: {
        caption: string,
        image: string,
    },
    siteLinks: SiteLink[]
}

export type SiteLink = {
    title: string,
    url: string,
}