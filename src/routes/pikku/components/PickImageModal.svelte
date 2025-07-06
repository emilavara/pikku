<script>
    import { onMount } from 'svelte';
    import { showPickImageModal } from '../store.js';
    
    let images = [];
    let modalTitle = 'Choose an image'
    let modalContentContext = 'root'

    export let onPick = (url) => {};
    
    function handleImageClick(url) {
        onPick(url);
    }

    async function fetchImages() {
        const res = await fetch('/api/pikku/images');
        images = await res.json();
    }

    function handleEscapeKey(e) {
        if (e.key === "Escape") {
            showPickImageModal.set(false)
        }
    }

    async function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        await fetch('/api/pikku/upload', {
            method: 'POST',
            body: formData
        });

        await fetchImages();
    }

    async function deleteImage(filename) {
        const confirmed = confirm(`Are you sure you want to delete ${filename}? This cannot be undone.`)
        if (!confirmed) return

        await fetch(`/api/pikku/images?filename=${filename}`, {
            method: 'DELETE'
        });
        await fetchImages();
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
        <div on:click={() => showPickImageModal.set(false)}>
            <i class="bi bi-x"></i>
        </div>
    </div>
    <div class="pikku-modal-content">
        {#each images as image}
            <div class="media-container">
                <div class="image-container">
                    <img on:click={() => handleImageClick(image)} src={image} alt="idk"/>
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
        <button on:click={() => showPickImageModal.set(false)} class="small secondary">Close</button>
    </div>
</div>