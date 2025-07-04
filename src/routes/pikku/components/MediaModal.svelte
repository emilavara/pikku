<script>
    import { showMediaModal } from '../store.js';
    import { onMount } from 'svelte';
    
    let images = [];
    let modalTitle = 'My media'
    let modalContentContext = 'root'

    async function fetchImages() {
        const res = await fetch('/api/pikku/images');
        images = await res.json();

        console.log(images)
    }

    function handleEscapeKey(e) {
        if (e.key === "Escape") {
            showMediaModal.set(false)
        }
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
        <i class="bi bi-x"></i>
    </div>
    <div class="pikku-modal-content">
        {#each images as image}
            <div class="media-container">
                <div class="image-container">
                    <img src={image} alt="idk"/>
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