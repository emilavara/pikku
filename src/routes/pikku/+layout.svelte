<script>
    import './css/main.css';
    import { onMount } from 'svelte'

    onMount(() => {
        document.body.classList.add('pikku')

        return () => {
            document.body.classList.remove('pikku')
        }
    })
</script>

<slot/>