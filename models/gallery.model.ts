import { IImageCollection } from "./image-collection.model";
import { ISite } from "./site.model";

export interface IGallery {
    title: string,
    subtitle: string,
    images: any[],
    site: ISite,
    id: number,
    collections: IImageCollection[],
}