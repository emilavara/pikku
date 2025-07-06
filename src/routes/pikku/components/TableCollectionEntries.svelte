<script>
    import { goto } from '$app/navigation'
    export let entries
    export let fields
    export let collection

    async function deleteEntry(id) {
        const confirmed = confirm('Are you sure you want to delete this entry?')
        if (!confirmed) return

        const res = await fetch(`/api/pikku/collections/${collection}/entries/${id}`, {
            method: 'DELETE'
        })

        if (res.ok) {
            entries = entries.filter(e => e.id !== id)
        } else {
            alert('Failed to delete entry.')
        }
    }
</script>

<div class="pikku-table-collection-entries">
    <table>
        <thead>
            <tr>
                {#each fields as field}
                    <th>{field.name}</th>
                {/each}
                <th>id</th>
            </tr>
        </thead>
        <tbody>
            {#each entries as entry}
                <tr on:click={() => goto(`/pikku/${collection}/edit/${entry.id}`)}>
                    {#each fields as field}
                        <td>
                            {#if field.type != 'image'}
                                {entry[field.name] ?? ''}
                            {/if}
                            {#if field.type === 'image'}
                                {#each entry.images as image}
                                    <img src={image} height="24px"/>
                                {/each}
                            {/if}
                        </td>
                        
                    {/each}
                    <td>{entry.id}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>