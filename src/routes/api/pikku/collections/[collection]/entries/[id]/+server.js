import fs from 'fs/promises'
import path from 'path'
const DATA_DIR = './static/data'

export async function PUT({ params, request }) {
    const filePath = path.join(DATA_DIR, `${params.collection}.json`)
    const raw = await fs.readFile(filePath, 'utf-8')
    const json = JSON.parse(raw)

    const updatedData = await request.json()

    json.data = json.data.map(entry =>
        entry.id === params.id ? { ...entry, ...updatedData } : entry
    )

    await fs.writeFile(filePath, JSON.stringify(json, null, 2))
    return new Response('OK')
}

export async function DELETE({ params }) {
    const filePath = path.join(DATA_DIR, `${params.collection}.json`)
    const raw = await fs.readFile(filePath, 'utf-8')
    const json = JSON.parse(raw)

    json.data = json.data.filter(entry => entry.id !== params.id)

    await fs.writeFile(filePath, JSON.stringify(json, null, 2))
    return new Response('OK')
}