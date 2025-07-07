<script>
    //imports
    import { fade, fly } from 'svelte/transition';
    import { showEditItemSheet, toast } from '../store';
    import { page } from '$app/stores';

    //props
    export let fields;
    export let selectedEntry;
    export let fetchItems;

    //data
    let collection = $page.params.collection

    //methods
    async function saveEntry() {
        const res = await fetch(`/api/pikku/collections/${collection}/entries/${selectedEntry.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedEntry)
        })

        if (res.ok) {
            showEditItemSheet.set(false)
            toast('Item saved successfully.', 3000, 'success')
            fetchItems()
        } else {
            toast('Something went wrong when trying to save.', 3000, 'error')
        }
    }

    async function deleteEntry() {
        const confirmed = confirm('Are you sure you want to delete this entry?')
        if (!confirmed) return

        const res = await fetch(`/api/pikku/collections/${collection}/entries/${selectedEntry.id}`, {
            method: 'DELETE'
        })

        if (res.ok) {
            showEditItemSheet.set(false)
            toast('Item deleted successfully.', 3000, 'success')
            fetchItems()
        } else {
            toast('Failed to delete item.', 3000, 'error')
        }
    }
</script>

<div transition:fade={{duration: 200}} class="pikku-sheet-wrapper {showEditItemSheet ? 'visible' : ''}">
    <div in:fly={{ x: 100, duration: 300 }} out:fly={{x: 100, duration: 300}} class="pikku-sheet">
        <div class="pikku-sheet-header">
            <p class="white-text">Edit {collection} item</p>
        </div>
        
        <div class="pikku-sheet-content">
            <form on:submit|preventDefault={saveEntry}>
                {#each fields as field}
                    <div style="margin-bottom: 1.5rem;">
                            <div class="label">{field.name}</div>
                            {#if field.type === 'text' || field.type === 'date'}
                                <input
                                    spellcheck="false"
                                    type={field.type}
                                    bind:value={selectedEntry[field.name]}
                                />
                            {:else if field.type === 'textarea'}
                                <textarea bind:value={selectedEntry[field.name]} spellcheck="false"></textarea>
                            {:else if field.type === 'checkbox'}
                                <input
                                    type="checkbox"
                                    bind:checked={selectedEntry[field.name]}
                                />
                            {:else if field.type === 'select'}
                                <select bind:value={selectedEntry[field.name]}>
                                    {#each field.options ?? [] as option}
                                        <option value={option.value}>{option.label}</option>
                                    {/each}
                                </select>
                            {:else if field.type === 'image'}
                                <div class="image-wrapper">
                                    {#each selectedEntry.images as image, i}
                                        <div class="image-container">
                                            <img src={image} alt="thingy" height="100" width="100" draggable="false"/>
                                            <button on:click={() => selectedEntry.images = [...selectedEntry.images.slice(0, i), ...selectedEntry.images.slice(i + 1)]} type="button" class="square-button" aria-label="delete image">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    {/each}
                                    <button type="button" on:click={() => showPickImageModal.set(true)} class="secondary" aria-label="add image">
                                        <i class="bi bi-plus"></i>
                                    </button>
                                </div>
                            {/if}
                    </div>
                {/each}
                <button style="display: none" id="editSubmitButton" type="submit">Save Changes</button>
            </form>
        </div>
        
        <div class="pikku-sheet-footer">
            <button on:click={() => deleteEntry()} class="small secondary">Delete</button>
            <div>
                <button on:click={() => showEditItemSheet.set(false)} class="small secondary">Cancel</button>
                <button on:click={() => document.getElementById('editSubmitButton').click()} class="small">Save Item</button>
            </div>
        </div>
    </div>
</div>

<style>
    .pikku-sheet-wrapper {
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        position: absolute;
        z-index: 1;
        background-color: rgba(0,0,0,0);
        transition: background-color 0.2s ease;
        padding: 8px;

        &.visible {
            background-color: rgba(0,0,0,0.50);
        }

        .pikku-sheet {
            width: 40rem;
            height: 100%;
            background: var(--pikku-bg);
            border-left: 1px solid var(--border-color);
            position: absolute;
            right: 0;
            top: 0;
            display: grid;
            grid-template-rows: 64px 1fr 64px;

            .pikku-sheet-header {
                background-color: var(--pikku-sidebar-bg);
                height: 64px;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                width: 100%;
                gap: 8px;
            }

            .pikku-sheet-content {
                padding: 24px;
                
                .label {
                    font-size: 12px;
                    color: var(--muted-text);
                    margin-bottom: 0.25rem;
                    text-transform: uppercase;
                    font-weight: 700;
                }

                input[type=text], textarea {
                    height: 38px;
                    width: 100%;
                    appearance: none;
                    background-color: var(--pikku-sidebar-bg);
                    color: white;
                    font-family: 'JetBrains Mono';
                    padding: 0 12px;
                    border: 1px solid var(--border-color);
                    font-size: 12px;

                    &:focus {
                        outline: none;
                    }
                }

                textarea {
                    height: 192px;
                    padding: 12px;
                    resize: none;
                    line-height: 1.5;
                }

                textarea::-webkit-scrollbar {
                    width: 8px;
                }

                textarea::-webkit-scrollbar-track {
                    background: transparent;
                }

                textarea::-webkit-scrollbar-thumb {
                    background: var(--border-color);
                    border: 3px solid var(--pikku-bg);
                    border-radius: 8px;
                }

                select {
                    width: 100%;
                    background-color: var(--pikku-sidebar-bg);
                    border: 1px solid var(--border-color);
                    font-family: 'JetBrains Mono';
                    height: 38px;
                    color: white;
                    font-weight: 700;
                    font-size: 12px;
                    text-transform: uppercase;
                    appearance: base-select;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    border-radius: 0;
                    padding-left: 12px;

                    &, &::picker(select) {
                        background: #050505;
                        color: white;
                        outline: none;
                        border-radius: 0;
                        box-shadow: none;
                    }
                }

                .image-wrapper {
                    display: flex;
                    gap: 0.5rem;

                    .image-container {
                        height: 64px;
                        width: 64px;
                        border: 1px solid var(--border-color);
                        padding: 0.5rem;
                        position: relative;
                        overflow: hidden;
                        transition: padding 0.2s ease;

                        button {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            translate: -50% -50%;
                            height: 32px;
                            width: 32px;
                            background-color: rgb(227, 33, 33);
                            border: 1px solid rgb(229, 139, 139) !important;
                            color: white !important;
                            box-shadow: 0px 0px 64px 64px rgba(0,0,0,0.75);
                            transition: opacity 0.1s ease;
                        }

                        &:hover {
                            padding: 0.25rem;
                            
                            button {
                                opacity: 1;
                            }
                        }

                        button {
                            opacity: 0;
                        }

                        img {
                            height: 100%;
                            width: 100%;
                            object-fit: contain;
                            user-select: none;
                        }
                    }

                    button {
                        height: 64px;
                        width: 64px;
                        text-align: center;
                        padding: 0;
                    }
                }
            }

            .pikku-sheet-footer {
                background-color: var(--pikku-sidebar-bg);
                height: 64px;
                border-top: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px;
                width: 100%;
                gap: 8px;
            }
        }
    }
</style>