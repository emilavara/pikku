<script>
    import { showCreateCollectionModal } from '../store.js';
    
    let name = ''
    let validationError = false;
    
    async function createCollection() {
        if (name === '') {
            validationError = true;
            return
        }

        const res = await fetch('/api/pikku/collections', {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: { 'Content-Type': 'application/json' }
        })
        
        if (res.ok) location.href = '/pikku'
    }
</script>

<div class="pikku-modal create-collection-modal">
    <div class="pikku-modal-header">
        <p class="modal-title">Create a new collection</p>
        <i class="bi bi-x"></i>
    </div>
    <div class="pikku-modal-content">
        <div class="pikku-modal-input-label">
            <p class="muted-text">Title</p>
            {#if validationError}
                <p class="validation-error">Collection needs to have a name</p>
            {/if}
        </div>
        <input on:input={validationError = false} bind:value={name} placeholder="e.g. Posts" class="pikku-modal-text-input" type="text"/>
    </div>
    <div class="pikku-modal-footer">
        <button on:click={() => showCreateCollectionModal.set(false)} class="small secondary">Cancel</button>
        <button on:click={createCollection} class="small">Create</button>
    </div>
</div>