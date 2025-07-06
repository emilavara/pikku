<script>
    import pikku from "$lib/pikkuClient";
    import { onMount } from "svelte";

    let posts = []

    onMount(async () => {
        posts = await pikku.find({collection: 'posts'})
    })
</script>

{#each posts as post}
    <h1>{post.title}</h1>
    <h1>{post.body}</h1>
    <!-- {#each post.images as image}
        <img src={image} alt="" height="100">
    {/each} -->
    <img src={post.images[0]} height="100"/>
{/each}