import { createReadStream, } from "fs";
import fs from 'fs/promises';
import { getClient } from "./sanity.utils";

const basePath = './imageCollections';

async function _gatherCollections() {
    let collections: any[] = [];
    const dirs = await fs.readdir(basePath);
    for (let i = 0; i < dirs.length; i++) {
        let dir = dirs[i];
        const stat = await fs.stat(`${basePath}/${dir}`);
        const isDir = stat.isDirectory();

        if (isDir) {
            const files = await fs.readdir(`${basePath}/${dir}`);
            const collection = {
                name: dir,
                description: '',
                files: [] as any[]
            };

            for (let j = 0; j < files.length; j++) {
                const file = files[j];
                let desc = '';
                if (file == 'description.txt') {
                    const data = await fs.readFile(`${basePath}/${dir}/${file}`, 'utf8');
                    const description = data.trim();
                    desc = description;
                    collection.description = desc;
                }

                collection.files.push({
                    name: file,
                    path: `${basePath}/${dir}/${file}`
                });
            }

            collections.push(collection);
        }
    }

    return collections;
}

async function createCollection() {
    const gallery = {
        _ref: "d26a3120-6c76-4aec-8119-684be86ebec6",
        _type: "reference"
    };
    try {

        const collections = await _gatherCollections();
        const client = getClient();

        console.log('[COLLECTIONS LENGTH]', collections.length);

        let savedRefs: any[] = [];

        for (let i = 0; i < collections.length; i++) {
            const c = collections[i];
            let _doc = {
                _type: 'imageCollection',
                name: c.name,
                description: c.description,
                images: [],
                gallery: gallery
            };

            console.log(_doc);

            const docRef = await client.create(_doc);

            for (let fi = 0; fi < c.files.length; fi++) {
                const file = c.files[fi];
                console.log('[UPLOADING FILE]');
                console.log(file);
                const stream = createReadStream(file.path);
                const image = await client.assets.upload('image', stream as any, { filename: file.name });
                console.log('[IMAGE UPLOADED]');

                console.log(image);

                await client.patch(docRef._id, {
                    insert: {
                        after: "images[0]",
                        items: [{
                            _type: "galleryImage",
                            _key: image.assetId,
                            asset: {
                                _ref: image._id,
                                _type: "reference"
                            },
                            metadata: image.metadata,
                            Caption: image.originalFilename?.replace(`.${image.extension}`, '')
                        }]
                    },
                }).commit()

                savedRefs.push(docRef);
            }
        }

        const WData = {
            collections: savedRefs
        }

        await fs.writeFile('./scripts/collections.json', JSON.stringify(WData, null, 2), 'utf8');
    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
}

async function deleteCollections() {
    try {
        const data: any = await fs.readFile('./scripts/collections.json', 'utf8');
        console.log(data);
        if (data) {
            const _data = JSON.parse(data);
            const collections = _data.collections || [];
            console.log(collections);
            const client = getClient();

            for (let i = 0; i < collections.length; i++) {
                const collection = collections[i];
                console.log('[DELETING COLLECTION]', collection._id);
                const res = await client.delete(collection._id);

                console.log(res);
            }
        }
        console.log('[ALL IMAGE COLLECTIONS DELETED]');
    } catch (error) {
        console.error(error);
    } finally {
        process.exit(0);
    }
}

async function run() {
    const args = process.argv.slice(2);

    if (args.length == 0) {
        createCollection();
    } else if (args.length && args[0] == 'delete') {
        deleteCollections();
    }
}

run();

const x = {};
export default x;