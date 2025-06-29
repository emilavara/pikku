const pikku = {
    async find({ collection, where }) {
        const res = await fetch(`/data/${collection}.json`)
        if (!res.ok) {
            throw new Error(`Failed to fetch /data/${collection}.json`)
        }

        const json = await res.json()
        const data = json.data || []

        return where ? applyWhere(data, where) : data
    }
}

function applyWhere(data, where) {
    return data.filter(entry => {
        return Object.entries(where).every(([key, condition]) => {
            if (!condition || typeof condition !== 'object') return false

            const value = entry[key]

            if ('equals' in condition) return value === condition.equals
            if ('notEquals' in condition) return value !== condition.notEquals
            if ('contains' in condition && typeof value === 'string') {
                return value.includes(condition.contains)
            }

            return true
        })
    })
}

export default pikku