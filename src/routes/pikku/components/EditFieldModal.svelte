<script>
    import { showEditFieldModal } from "../store";

    export let fields
    let tempFields = fields
    export let saveFields

    function addField() {
        tempFields = [...tempFields, { name: '', type: 'text' }]
    }

    function removeField(index) {
        tempFields = tempFields.filter((_, i) => i !== index)
    }
</script>

<div class="pikku-modal create-field-modal">
    <div class="pikku-modal-header">
        <p class="modal-title">Edit fields</p>
        <i class="bi bi-x"></i>
    </div>
    <div class="pikku-modal-content">
        <ul>
            {#each tempFields as field, i}
                <li>
                    <input
                        type="text"
                        bind:value={field.name}
                        placeholder="Field Name"
                    />
                    <select bind:value={field.type}>
                        <option value="text">Text</option>
                        <option value="textarea">Textarea</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="date">Date</option>
                    </select>
                    <button on:click={() => removeField(i)} class="square-button" aria-label="delete field">
                        <i class="bi bi-trash"></i>
                    </button>
                </li>
            {/each}
        </ul>
    </div>
    <div class="pikku-modal-footer" style="justify-content: space-between">
        <button on:click={() => addField()} class="small">Add field</button>
        <div>
            <button on:click={() => showEditFieldModal.set(false)} class="small secondary">Cancel</button>
            <button on:click={() => saveFields(tempFields)} class="small">Save</button>
        </div>
    </div>
</div>