<script>
    import { onMount } from 'svelte';
    import { showMediaModal, toast } from '../store.js';
    
    let images = [];
    let modalTitle = 'My media'
    let modalContentContext = 'root'
    let dragOver = false;
    let dragValidationError = 'none';

    async function fetchImages() {
        const res = await fetch('/api/pikku/images');
        images = await res.json();
    }

    function handleEscapeKey(e) {
        if (e.key === "Escape") {
            showMediaModal.set(false)
        }
    }

    async function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        await fetch('/api/pikku/upload', {
            method: 'POST',
            body: formData
        });

        toast('Image uploaded', 3000, 'success')

        await fetchImages();
    }

    async function deleteImage(filename) {
        const confirmed = confirm(`Are you sure you want to delete ${filename}? This cannot be undone.`)
        if (!confirmed) return

        await fetch(`/api/pikku/images?filename=${filename}`, {
            method: 'DELETE'
        });

        toast('Image deleted', 3000, 'success')
        
        await fetchImages();
    }

    function handleDrop(event) {
        event.preventDefault();
        dragOver = false;

        const files = Array.from(event.dataTransfer.files);
        for (const file of files) {
            
            if (!file.type.startsWith('image/')) {
                dragValidationError = "This doesn't look like an image."
                return
            }
            
            if (file.type.startsWith('image/')) {
                uploadFile(file);
            }
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
        dragOver = true;
        dragValidationError = 'none'
    }

    function handleDragLeave() {
        dragOver = false;
    }


    onMount(() => {
        document.addEventListener('keydown', handleEscapeKey);
        fetchImages();

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    });
</script>

<div class="pikku-modal media-modal">
    <div class="pikku-modal-header">
        <p class="modal-title">{modalTitle}</p>
        <div on:click={() => showMediaModal.set(false)}>
            <i class="bi bi-x"></i>
        </div>
    </div>
    <div class="pikku-modal-content">
        <div class="upload-container {dragOver ? 'dragover' : ''}" on:dragover={handleDragOver} on:dragleave={handleDragLeave} on:drop={handleDrop} role="region">
            <div class="inner-container">
                {#if dragValidationError === 'none'}
                    <p>Drop an image here to upload.</p>
                {:else if dragValidationError != 'none'}
                    <p>{dragValidationError}</p>
                {/if}
            </div>
        </div>
        {#each images as image}
            <div class="media-container">
                <div class="image-container">
                    <img src={image} alt="idk"/>
                    <button on:click={() => deleteImage(image.replace('/images/', ''))} class="delete-button" aria-label="delete image button">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <div class="image-title">
                    <p>{image.replace('/images/', '')}</p>
                </div>
            </div>
        {/each}
    </div>
    <div class="pikku-modal-footer">
        <button on:click={() => showMediaModal.set(false)} class="small">Upload image</button>
        <button on:click={() => showMediaModal.set(false)} class="small secondary">Close</button>
    </div>
</div>