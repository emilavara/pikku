import fs from 'fs/promises'
import path from 'path'
const DATA_DIR = './static/data'

export async function POST({ params, request }) {
    const filePath = path.join(DATA_DIR, `${params.collection}.json`)
    const body = await request.json()

    const raw = await fs.readFile(filePath, 'utf-8')
    const json = JSON.parse(raw)

    const newEntry = {
        id: crypto.randomUUID(),
        ...body
    }

    json.data = json.data || []
    json.data.push(newEntry)

    await fs.writeFile(filePath, JSON.stringify(json, null, 2))
    return new Response(JSON.stringify(newEntry), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    })
}
