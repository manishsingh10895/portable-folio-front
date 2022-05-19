import { SanityImageAssetDocument } from "@sanity/client";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";

export interface IImageCollection {
    name: string,
    description?: string,
    images: SanityImageAssetDocument[],
}
