// CRUD for for one collection

import fs from 'fs/promises'
import path from 'path'
const DATA_DIR = './static/data'

export async function GET({ params }) {
    const filePath = path.join(DATA_DIR, `${params.collection}.json`)
    const raw = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(raw)
    return new Response(JSON.stringify(data))
}

export async function PUT({ params, request }) {
    const body = await request.json()
    const filePath = path.join(DATA_DIR, `${params.collection}.json`)
    await fs.writeFile(filePath, JSON.stringify(body, null, 2))
    return new Response('OK')
}

export async function DELETE({ params }) {
    const filePath = path.join(DATA_DIR, `${params.collection}.json`)
    try {
        await fs.unlink(filePath)
        return new Response('Deleted', { status: 200 })
    } catch (err) {
        return new Response('Failed to delete collection', { status: 500 })
    }
}