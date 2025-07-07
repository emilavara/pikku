import fs from 'fs';
import path from 'path';

export const POST = async ({ request }) => {
    const form = await request.formData();
    const file = form.get('file');

    if (!file || typeof file === 'string') {
        return new Response('Invalid file', { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const originalName = file.name;
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext);
    const outputDir = 'static/images';

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    function getUniqueFilename(base, ext, dir) {
        let candidate = `${base}${ext}`;
        let counter = 2;
        while (fs.existsSync(path.join(dir, candidate))) {
            candidate = `${base} (${counter})${ext}`;
            counter++;
        }
        return candidate;
    }

    const uniqueName = getUniqueFilename(baseName, ext, outputDir);
    const outputPath = path.join(outputDir, uniqueName);

    try {
        fs.writeFileSync(outputPath, buffer);

        return new Response(JSON.stringify({ url: `/images/${uniqueName}` }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error('Error saving file:', err);
        return new Response('File saving failed', { status: 500 });
    }
};
