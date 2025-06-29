<script>
    import { showEditFieldModal } from "../store";
    export let fields
</script>

<div class="pikku-table-collection-entries">
    <table>
        <thead>
            <tr>
                <!-- <th>id</th> -->
                <th>Name</th>
                <th>Type</th>
            </tr>
        </thead>
        <tbody>
            {#each fields as field}
                <tr on:click={() => showEditFieldModal.set(true)}>
                    <td>{field.name}</td>
                    <td>{field.type}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>