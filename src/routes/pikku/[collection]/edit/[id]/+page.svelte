<script>
    import { onDestroy, onMount } from 'svelte'
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'

    let fields = []
    let entry = {}
    let collection = $page.params.collection
    let id = $page.params.id

    import Sidebar from '../../../components/Sidebar.svelte';

    onMount(async () => {
        const res = await fetch(`/api/pikku/collections/${collection}`)
        const json = await res.json()

        fields = json._config?.fields || []
        const found = json.data?.find(e => e.id === id)
        if (!found) {
            alert('Entry not found')
            goto(`/pikku/${collection}`)
            return
        }

        entry = structuredClone(found)

        //add save shortcut event listener
        document.addEventListener('keydown', handleSaveShortcut)
    })

    onDestroy(() => {
        //remvoe save shortcut event listener
        // document.removeEventListener('keydown', handleSaveShortcut);
    })

    function handleSaveShortcut(e) {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const isSaveShortcut = (isMac && e.metaKey) || (!isMac && e.ctrlKey);

        if (isSaveShortcut && e.key === 's') {
            //prevent browser save
            e.preventDefault();

            //.click() hack
            document.getElementById('editSubmitButton').click()
        }
    }

    async function save() {
        const res = await fetch(`/api/pikku/collections/${collection}/entries/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry)
        })

        if (res.ok) {
            goto(`/pikku/${collection}`)
        } else {
            alert('Failed to save.')
        }
    }

    async function deleteEntry(id) {
        const confirmed = confirm('Are you sure you want to delete this entry?')
        if (!confirmed) return

        const res = await fetch(`/api/pikku/collections/${collection}/entries/${id}`, {
            method: 'DELETE'
        })

        if (res.ok) {
            goto(`/pikku/${collection}`)
        } else {
            alert('Failed to delete entry.')
        }
    }
</script>

<div class="pikku-wrapper">
    <Sidebar/>
    <div class="pikku-main">
        <div class="pikku-header">
            <div class="left-container">
                <button on:click={() => goto(`/pikku/${collection}`)} class="square-button" aria-label="back button">
                    <i class="bi bi-chevron-left"></i>
                </button>
                <div class="muted-text">Collections</div>
                <div class="muted-text">/</div>
                <div class="muted-text">{collection}</div>
                <div class="muted-text">/</div>
                <div class="white-text">{id}</div>
            </div>
            <div>
                <button on:click={() => deleteEntry(id)} class="secondary">Delete item</button>
                <button on:click={() => document.getElementById('editSubmitButton').click()}>Save changes</button>
            </div>
        </div>
        <div class="pikku-content pikku-edit-item-content">
            <form on:submit|preventDefault={save}>
                {#each fields as field}
                    <div style="margin-bottom: 1.5rem;">
                        <label>
                            <div class="label">{field.name}</div>
                            {#if field.type === 'text' || field.type === 'date'}
                                <input
                                    spellcheck="false"
                                    type={field.type}
                                    bind:value={entry[field.name]}
                                />
                            {:else if field.type === 'textarea'}
                                <textarea bind:value={entry[field.name]} spellcheck="false"></textarea>
                            {:else if field.type === 'checkbox'}
                                <input
                                    type="checkbox"
                                    bind:checked={entry[field.name]}
                                />
                            {:else if field.type === 'select'}
                                <select bind:value={entry[field.name]}>
                                    {#each field.options ?? [] as option}
                                        <option value={option.value}>{option.label}</option>
                                    {/each}
                                </select>
                            {/if}
                        </label>
                    </div>
                {/each}
                <button style="display: none" id="editSubmitButton" type="submit">Save Changes</button>
            </form>
        </div>
    </div>
</div>