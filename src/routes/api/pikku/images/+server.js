import fs from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';

const imagesDir = path.resolve('static/images');

export const GET = async () => {
    if (!fs.existsSync(imagesDir)) {
        return json([]);
    }

    const files = fs.readdirSync(imagesDir)
        .filter(file => /\.(webp|png|jpg|jpeg|gif)$/i.test(file))
        .map(file => `/images/${file}`);

    return json(files);
};

export const DELETE = async ({ url }) => {
    const filename = url.searchParams.get('filename');

    if (!filename) return new Response('Missing filename', { status: 400 });

    const filePath = path.join(imagesDir, filename);

    if (!fs.existsSync(filePath)) return new Response('File not found', { status: 404 });

    fs.unlinkSync(filePath);
    return new Response('Deleted', { status: 200 });
};

export const PATCH = async ({ request }) => {
    const { oldName, newName } = await request.json();

    if (!oldName || !newName) {
        return new Response('Missing names', { status: 400 });
    }

    const oldPath = path.join(imagesDir, oldName);
    const newPath = path.join(imagesDir, newName);

    if (!fs.existsSync(oldPath)) {
        return new Response('Old file not found', { status: 404 });
    }

    fs.renameSync(oldPath, newPath);

    return json({ url: `/images/${newName}` });
};
