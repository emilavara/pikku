<script>
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'

    import { showCreateCollectionModal, showEditFieldModal } from '../store'

    import Sidebar from '../components/Sidebar.svelte';
    import TableCollectionEntries from '../components/TableCollectionEntries.svelte';
    import TableCollectionFields from '../components/TableCollectionFields.svelte';
    import EditFieldModal from '../components/EditFieldModal.svelte';

    export let data

    let collection = data.collection
    let entries = []
    let fields = []
    let tabContext = 'items'
    let tabButtons = ['items', 'fields']

    async function saveFields(newFields) {
        fields = newFields

        const res = await fetch(`/api/pikku/collections/${collection}`)
        const json = await res.json()
        json._config.fields = fields
        await fetch(`/api/pikku/collections/${collection}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json)
        })

        showEditFieldModal.set(false)
    }

    onMount(async () => {
        const res = await fetch(`/api/pikku/collections/${collection}`)
        const json = await res.json()
        entries = json.data || []
        fields = json._config?.fields || []
    })

    async function deleteCollection() {
        const confirmed = confirm(`Are you sure you want to delete the entire "${collection}" collection? This cannot be undone.`)
        if (!confirmed) return

        const res = await fetch(`/api/pikku/collections/${collection}`, {
            method: 'DELETE'
        })

        if (res.ok) {
            alert('Collection deleted.')
            goto('/pikku')
        } else {
            alert('Failed to delete collection.')
        }
    }

    async function addItem() {
        const newId = crypto.randomUUID();
        const res = await fetch(`/api/pikku/collections/${collection}/entries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: newId
            })
        })
        if (res.ok) {
            // alert('Entry created!')
            goto(`/pikku/${collection}/edit/${newId}`)
        } else {
            alert('Failed to create entry.')
        }
    }

    function setTab(tab) {
        tabContext = tab
    }
</script>

<div class="pikku-wrapper">
    <Sidebar/>
    {#if $showEditFieldModal}
        <EditFieldModal fields={fields} saveFields={saveFields}/>
    {/if}
    <div class="pikku-main tabbed">
        <div class="pikku-header tabbed">
            <div class="top-container">
                <div class="left-container">
                    <button on:click={() => goto('/pikku')} class="square-button" aria-label="back button">
                        <i class="bi bi-chevron-left"></i>
                    </button>
                    <p class="muted-text">Collections</p>
                    <p class="muted-text">/</p>
                    <p class="white-text">{collection}</p>
                </div>
                <div>
                    {#if tabContext === 'items'}
                        <button on:click={deleteCollection} class="secondary">Delete collection</button>
                        <button on:click={() => addItem()}>Add item</button>
                    {/if}

                    {#if tabContext === 'fields'}
                        <button on:click={() => showEditFieldModal.set(true)}>Edit fields</button>
                    {/if}
                </div>
            </div>
            <div class="bottom-container">
                {#each tabButtons as button}
                    <button on:click={() => setTab(button)} class={['tab-button', button === tabContext ? 'active' : '']}>{button}</button>
                {/each}
            </div>
        </div>
        <div class="pikku-content tabbed">
            {#if tabContext === 'items'} 
                {#if entries.length === 0}
                    <!-- <p class="white-text">No entries yet.</p> -->
                {:else}
                    <TableCollectionEntries collection={collection} entries={entries} fields={fields}/>
                {/if}
            {/if}

            {#if tabContext === 'fields'} 
                {#if fields.length === 0}
                    <!-- <p class="white-text">No fields yet.</p> -->
                {:else}
                    <TableCollectionFields fields={fields}/>
                {/if}
            {/if}
        </div>
    </div>
</div>