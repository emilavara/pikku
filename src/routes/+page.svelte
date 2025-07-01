<script>
    import { onMount } from 'svelte'
    import pikku from '$lib/pikkuClient.js'

    let posts = []

    onMount(async () => {
        posts = await pikku.find({ 
            collection: 'products'
        })
    })
</script>

<pre>
    {JSON.stringify(posts, null, 4)}
</pre>


<h1>Hello world</h1>