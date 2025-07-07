<script>
    import { showEditFieldModal } from "../store";
    import { onMount } from "svelte";

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
        
        <div class="field-input-wrapper">
            {#each tempFields as field, i}
                <div class="field-input-container">
                    <div class="field">
                        <input type="text" bind:value={field.name} placeholder="Field Name"/>
                        <select bind:value={field.type}>
                            <option value="text">Text</option>
                            <option value="textarea">Textarea</option>
                            <option value="image">Image</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="select">Select</option>
                        </select>

                        <button on:click={() => removeField(i)} class="secondary" aria-label="delete field">
                            Delete
                        </button>
                    </div>

                    <!-- if field type is select -->
                    {#if field.type === 'select'}
                        <p class="muted-text" style="margin-top: 0.75rem;">{field.name} Select Options</p>
                        {#each field.options as option, j}
                                <div class="select-option">
                                    <input type="text" bind:value={option.label} placeholder="Option Label"/>
                                    <input type="text" bind:value={option.value} placeholder="Option Value"/>
                                    <button on:click={() => field.options = field.options.filter((_, index) => index !== j)} class="square-button" aria-label="remove select option">
                                        <i class="bi bi-x"></i>
                                    </button>
                                </div>
                        {/each}
                        
                        <button style="width: 100%;" on:click={() => {field.options = [...(field.options ?? []), { label: '', value: '' }]}} class="secondary">Add Option</button>
                    {/if}
                </div>
            {/each}
        </div>
            
    </div>
    <div class="pikku-modal-footer" style="justify-content: space-between">
        <button on:click={() => addField()} class="small">ADD FIELD</button>
        <div>
            <button on:click={() => showEditFieldModal.set(false)} class="small secondary">CANCEL</button>
            <button on:click={() => saveFields(tempFields)} class="small">SAVE</button>
        </div>
    </div>
</div>