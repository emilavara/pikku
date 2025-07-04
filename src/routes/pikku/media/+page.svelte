<script>
    import { onMount } from "svelte";
    let selectedFile = null;

    let uploaded = [];

    async function fetchImages() {
        const res = await fetch('/api/pikku/images');
        uploaded = await res.json();
    }

    onMount(fetchImages);

    async function upload() {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await fetch("/api/pikku/upload", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        selectedFile = null;
        fetchImages()
    }
</script>

<h1>📁 My Files</h1>

<input bind:value={selectedFile} type="file" on:change={e => selectedFile = e.target.files[0]} />
<button on:click={upload}>Upload</button>

<div class="grid">
    {#each uploaded as img}
        <img src={img} alt="" width="100" />
    {/each}
</div>

<style>
    
</style>