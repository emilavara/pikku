<script>
    export let collectionName
    export let collectionCount
</script>

<a href={`/pikku/${collectionName}`} class="pikku-collection-item">
    <p class="collection-name">{collectionName}</p>
    <p class="muted-text">{collectionCount} items</p>
</a>