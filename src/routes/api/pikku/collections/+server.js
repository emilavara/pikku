// List and create collections

import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.resolve('./static/data')

export async function GET() {
    const files = await fs.readdir(DATA_DIR)
    const jsonFiles = files.filter(f => f.endsWith('.json'))

    const collections = await Promise.all(
        jsonFiles.map(async (file) => {
            const name = file.replace('.json', '')
            const filePath = path.join(DATA_DIR, file)
            const raw = await fs.readFile(filePath, 'utf-8')
            const json = JSON.parse(raw)
            const count = Array.isArray(json.data) ? json.data.length : 0

            return {
                name,
                count
            }
        })
    )

    return new Response(JSON.stringify(collections), {
        headers: { 'Content-Type': 'application/json' }
    })
}

export async function POST({ request }) {
    const { name } = await request.json()
    const filePath = path.join(DATA_DIR, `${name}.json`)
    const emptyCollection = {
        _config: {
            label: name,
            fields: []
        },
        data: []
    }
    await fs.writeFile(filePath, JSON.stringify(emptyCollection, null, 2))
    return new Response('Created', { status: 201 })
}