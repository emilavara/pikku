<script>
    import { onMount } from 'svelte'

    //import store stuff
    import { showCreateCollectionModal } from './store';
    
    import Sidebar from './components/Sidebar.svelte';
    import CreateCollectionModal from './components/CreateCollectionModal.svelte';
    import CollectionItem from './components/CollectionItem.svelte';
    import NoCollections from './components/NoCollections.svelte';
    
    let collections = []

    onMount(async () => {
        const res = await fetch('/api/pikku/collections')
        collections = await res.json()
    })
</script>

<div class="pikku-wrapper">
    <Sidebar/>
    {#if $showCreateCollectionModal}
        <CreateCollectionModal/>
    {/if}
    <div class="pikku-main">
        <div class="pikku-header">
            <p class="white-text">My collections</p>
            <button on:click={() => showCreateCollectionModal.set(true)}>Add collection</button>
        </div>
        <div class={['pikku-content', collections.length === 0 ? 'no-collections' : '']}>
            <div class="pikku-collection-container">
                {#each collections as collection}
                    <CollectionItem collectionName={collection}/>
                {/each}
                
                {#if collections.length === 0}
                    <NoCollections/>
                {/if}
            </div>
        </div>
    </div>
</div>