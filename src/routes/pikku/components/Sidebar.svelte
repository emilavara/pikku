<script>
    import { onMount } from 'svelte'
    import { showMediaModal } from '../store.js';
    import { goto } from '$app/navigation'
    import { toast } from '../store.js';

    import PikkuLogo from './PikkuLogo.svelte';
    import MediaModal from './MediaModal.svelte';
    
    let collections = []

    onMount(async () => {
        const res = await fetch('/api/pikku/collections')
        collections = await res.json()
    })
</script>

<div class="pikku-sidebar">
    <div class="pikku-sidebar-header">
        <PikkuLogo/>
    </div>
    <div class="pikku-sidebar-content">
        <!-- <div class="pikku-sidebar-menu-title">
            <p class="muted-text">Collections</p>
            <button class="square-button" aria-label="add collection">
                <i class="bi bi-plus"></i>
            </button>
        </div>
        <div class="pikku-sidebar-collection-container">
            {#each collections as name}
                <div><a href={`/pikku/${name}`}>{name}</a></div>
            {/each}
        </div>
        <div class="pikku-sidebar-menu-title">
            <p class="muted-text">MENU</p>
            <button style="visibility: hidden" class="square-button" aria-label="add collection">
                <i class="bi bi-plus"></i>
            </button>
        </div>
        <div class="pikku-sidebar-collection-container">
            <div>Collections</div>
            <div on:click={() => showMediaModal.set(true)}>Media</div>
            <div>Settings</div>
        </div> -->
    </div>
    <div class="pikku-sidebar-footer">
        <!-- <button on:click={() => goto('/')} class="square-button" aria-label="log out button">
            <i class="bi bi-box-arrow-left"></i>
        </button>
        <p class="muted-text no-uppercase">pikkucms (v0.0.1 b13)</p> -->
    </div>
</div>

{#if $showMediaModal}
    <MediaModal/>
{/if}