<script>
    import { showCreateCollectionModal } from '../store';
</script>

<div class="pikku-no-collections">
    <p class="white-text">You don’t have any collections. <br/> Create your first collection to start content managing.</p>
    <button on:click={() => showCreateCollectionModal.set(true)}>Add collection</button>
</div>