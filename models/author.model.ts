import { SanityDocument } from "@sanity/client";
import { SanityReference } from "@sanity/image-url/lib/types/types";
import { ISocials } from "./socials.interface";

export type Author = SanityDocument<IAuthor>;

export interface IAuthor extends SanityDocument {
    name: string,
    shortName: string,
    image: string,
    slug: string,
    bio: any[],
    socials: ISocials,
    email: string,
    phone: string,
    address: string
}