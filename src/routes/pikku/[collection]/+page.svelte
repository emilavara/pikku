<script>
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'

    import { showCreateCollectionModal, showEditFieldModal } from '../store'

    import Sidebar from '../components/Sidebar.svelte';
    import TableCollectionEntries from '../components/TableCollectionEntries.svelte';
    import TableCollectionFields from '../components/TableCollectionFields.svelte';
    import EditFieldModal from '../components/EditFieldModal.svelte';

    export let data

    let collection = data.collection
    let entries = []
    let fields = []
    let tabContext = 'items'
    let tabButtons = ['items', 'fields']

    async function saveFields(newFields) {
        fields = newFields

        const res = await fetch(`/api/pikku/collections/${collection}`)
        const json = await res.json()
        json._config.fields = fields
        await fetch(`/api/pikku/collections/${collection}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json)
        })

        showEditFieldModal.set(false)
    }

    onMount(async () => {
        const res = await fetch(`/api/pikku/collections/${collection}`)
        const json = await res.json()
        entries = json.data || []
        fields = json._config?.fields || []
    })

    async function deleteCollection() {
        const confirmed = confirm(`Are you sure you want to delete the entire "${collection}" collection? This cannot be undone.`)
        if (!confirmed) return

        const res = await fetch(`/api/pikku/collections/${collection}`, {
            method: 'DELETE'
        })

        if (res.ok) {
            alert('Collection deleted.')
            goto('/pikku')
        } else {
            alert('Failed to delete collection.')
        }
    }

    async function addItem() {
        const newId = crypto.randomUUID();
        const res = await fetch(`/api/pikku/collections/${collection}/entries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: newId
            })
        })
        if (res.ok) {
            // alert('Entry created!')
            goto(`/pikku/${collection}/edit/${newId}`)
        } else {
            alert('Failed to create entry.')
        }
    }

    function setTab(tab) {
        tabContext = tab
    }
</script>

<svelte:head>
    <title>{collection} &mdash; Pikku</title>
    <link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA3uSURBVHgB7Z0/qxzXGcbfDYEoYIiLQBwweA2BuLMMgbgIeF0lnZ0qpa+rlFI+gdafQFKZaq/KVJK6pNorSGGDQXInQ2DGoEKFICpUKCB4cl6dM2gk772zu3PeM+eceX7wshfrWpqZff8959+IEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQnJmISQJAC67j0+cXQ72trNl71faYA+C3VssFq0QUirO6d92tnbW4Di2zr4QQkqi5/j/RRwaBgLJHgPHZyCQMnCOedXQ8XcFwkoImRp1RBzf449l42wphKQmOP4WebABA4GkQB0N+Th+n8bZWgixAPYCNxYNKJRJTJBW4MbiPtgWkTHA9/n3UTYbMBDIIcD3+bdRD42zq0J+BNcC9XBOoutz1FGuiF+rY8WZszvi1/x06Pqgz52txI7W2Z8Xi8UDIaQP0oznbzDQjrg//ySH6yAzAWnana2zTw68rhPYBkIDtkXzBvajO1sc6Pg7rjFFICyFzAfYz+I2GOn4O675GmwD4Tq8BiK1Aj+ZdQN2aDW5IkbAt2sb2NGAk2h1AluRq45/DYkyKOwDYQO2RXUA+6y/mcpZYKsPGrAalA1ss/4Wkfv8Y4FtIGzAalAW8FnfamhT253sMiNs26Imx3smO4Bt1r+GzEdK4AOhgQ0bsBrkCWx7/W1pXzzs2qIGrAZ5Abusr+3O51IosG2LNmA1mB7YZf1qJoZg1xY14Ob8aQhfqsVa/S0yGd2JDbyGsVj6sRaSDtis4TGdxc0F2LVFDdgS2QK74c3t3L482IhkTSJcYWoBbITuLLL+ecCuGmzAahAP+JYnNlpJuPpRzKpBAwbBOOBbni3iUvTQphWwqwZrIYcDm5ZnC2b9C4FNNdiA1WB/EL/lmXWvfyiwqQYNGAQXA9/ynCIuWz7444BNNeAo0S4Qf7aSWT8CsDkL9bqQV7gH8jniTmw18O/kIpGAn0WOSQNW5pcPdo24cHO3EYhfpRvMNVEhfr/P4c0EhO/tOuKyljmB+AvZtmA5TQriC+S1zAHEL6MUVBNh8F2upXYiPjBteapctlwaiCuQ6x0mRTzBuwVbnqyAb4lijOTp31HfIAZ8uYwBW55MQbyW6JrUBsaXySyPIyGvgzijRPVVAYwb9WnAlqcoMD7hraQmcDxbcGKrSNz3dhnHt0RJlrH8RBKA47P3erFYfOrsqZDiCK9i+lRefxXUviwlAUkC4EjU6W8JIYakCoBjMri2PQ24fLZYQh9/X/wLAA+llZrAuDHitZCiwPhNTXVNcmL8DiO++bwAEGeRYyO1Ab/HdywNuM4/WxBvkeNGagTxdhathWQF4m1qalBrpYfPELF2ft2u9kEVBuIeUFz3bD/8oqlYNGBLNBmIv1+4vjVAu0DcIFDWQpKC+Pu45+H8HYh/8NUWbInMQfw38cz39A7YbLLmilEjEH8ra4O5t7Cw2WTNPQORQfx3MnBepw947kyWwOaAYiaoXWDc8tnzWAs5CnidFjPr87S+IWDz7q8GrAZ7A5tXzjbgkPX+IH5LxNf37AFsjqXny0iOAX6suUFctmA1+BGwe9E4W54xwKYlYjXoAZus34DnNsUD8VsiZYsZVwPYZX22PBbAJlMpa5kZ4Fs3ywR80fMoYPeu5QYc5UkHbF6dqqxRaflG/NncDr6TYQoQfy1RR4OK1hTBTzBuER8eUJwDsBHIygYFt0Xw7U6sA4nfZAtm/XyAXTXQLLeWwoDNHEr3PCh0cwQ2K0s7GmefSebA5q2OHVtwEjF/YDdcqmxydALYtjvM+mNwD+8deCF2OZXzwLYaKGvJBNiN7ihbpPvOtHr9ydkXwfRnU52xEEPCg1s5e++NP9KjEu+Fw1NNgT+eT8+ZWUp8WvEH+E5yhmm4N91Lu5L46Hek93ZTjAlOrm/4fO+cXzlz13FPDDALAPhJkaGe+Xtn/0xx+jP8puu12NA601OsW0lASCwa1Cux4czZlynuJwTx751dGvhVkyAwCYAQ0X+V4ZvqMIvwPsFxtmJ39Paps6+sHCc8V13EZ3WCgiYidfw7Ykz4LjRBHtLi3Ir9bK1Oh17J/s7/8vfdA7ni7B0xRB+es/fFrhKciD/R+nrMvhlB4OrfLXbOf8PZ+9bO7+7jkvb27kedaDy0v4++1MKqAmj2P9aZvxNfEUzbouCg6kwnYkPr7Ka7jxsyAnedJ+Kvcyk2tM5OElXgj92Hzhwfkhz7PI2tSawqwJhM/qGzL2C8sCpUgy/dj2qtxGfpTCuBVoSDl1XAD+Xq2fpWAr4Tue9bO3+oYCfuxz/K8c6vRB8RsgqA5zIOvdHPwlCY7TDYYnHqPj4S3wJYsHR2um8gBMdXnaJmlQTOnH3k7v0rMSS0OyvxevA9Gc9jiYxVC3QicW64I6VIvi12jqe04jXId/Kq8miQr8T3xSuxo5V07c5SDhe5Qzxw135XImIVAEvxX2ZMtGTfTTQ0dyK2fXdq9NlphbuZQFtpi7MSP7QZE+0q/h77+i3nATT6LTJpKpGsmUun/9dSNjqq87dEiWOsyL2IuxYTp9YzwSp6Ppb4pJxJXortaJEVZ+JFbop2Z2gmdwymld80AJQwmqNZwULMtuIfToqZZK1o2kYsJW/0WVxNsTwjtDua4PaZyT2GM2ffuHsZO6hyLuYB0BFGA6x2DyURyUrG+iBZn68YidyOVhIltmQBoIRSecwM4D6kFMlL8fexljw4Fd/np3B8K5GraKbXZPaNJCJpAHQYt0VJRLKSgT44E+/45lpIMRa5eg//smx3djFJACihGujDtBgpSiaSlQkC4UwSCVylZJE7xGQB0GFcDXTm8B8pqoECf0LCqdjpAw3oqwkdvxO5ZtpNjEXuEJMHQEctIlkxEMqtJN54U4vIHSKbAFBCqf2LjFtMdx76sLXHfCiJCIEwZnnDmbPTxI6vWV+XK38o8UkucofIKgA6ahHJHb1suhJfFc7TPa34NufM2R13jT9IQmoUuUNkGQBKTSJ5F+7+XhOUqZ29T80id4hsA6DDfTkfiF9HXrxIzo05iNwhsg+AjppEcg7MReQOUUwAKLWJ5CmYm8gdoqgA6KhNJKdijiJ3iCIDQKldJMcknLahWX92IneIYgOggyL5fIxFrmb6ryVzkTtE8QHQQZH8OhS5+1FNACgJRHL2bVHI+jqm/1uJT3Eid4iqAqBjriLZWORqu3PPut1x9/BT96EmKVqrFFsi1Qk1I78V/pPe1BN3c9HPeNnx785CJNcgcsP3tZTXk9YLZ0+ctVbBYHkqhEbxb+T8dkRv6EGCjLIUu15YnePWVNWgBpEb/GTp7F25+FpMfMUyAHR0Zp9e/JH4CH8hhhiLZG2Lvrauah0JNqO3kkDkhqyvfrLPPajzfxvbT6wOxlLH/+CA/0Vvrk3UFlkt+lJaCSe+WThPqGb6XHUW18Lxk4jcEMB6H4dW5TZ2K2YVANp3H9NyaAC0C/u2yFIkd7TOfgifjw+9p+AkXV+spkFr4fQdqUSutjpLCUL3QJ7G1l1WAfAHOe4GFS1xGgSPxBBjkbwLdSwN8P+Fn9+sEJeC/UK841sGZ58pRe6hvHDX+W+JiFUArGQ8NYjknMlJ5O5LMQGgAi1Wua5BJOdGK/mJ3H0opgXS4c8YEd9Ri0iemtxF7hAPY/uAVQDoA/idHK8DzqMmkZyaEkTuRTxz1/6tRMZyHuDQodB90VboUSLRllIkW1GSyD0PvYeHRU2EKaESqANZjVmnEMkayLrArrRq8FLkJnj/V0yR+ybmI4JJFsOFkZal2KAP5xHbotd4KH53Vmkit49Z1u+T8nh0fUhLsVmqnFIkLyXfQGjF9/mtGGIochX9Lv/j7uGJJCD5cujQUizFJmskEclKqAhqU48YJd2ZZShylSRD3n2mOh5dnf9dsesbzUVyR68qpAyGl/rH2fcT3KeVyG0XE6yqnXRDTA0iuU+vzdNA+LWzX0mce1PH0HVFWuEeJj7WsWiRO0QWO8KCSNYHbFVWH6UMhD4hc/btZ85+Lq/W/ijP5dXLxZ/Kq7VCL23iay9a5A6RzZbIGkRyLSQQuQ8XmWwpzW5PcC0iuVRqE7lDZLkpviaRXAq1itwhsj4VojaRnCO1i9whsg6AjppF8pTMQeQOUUQAKBTJ8ZiTyB2imADooEgex9xE7hDFBYBiLJKVtjaRPFeRO0SRAdBBkTzM3EXuEEUHQIdxWS+2LXLP5ZfiT+ebrcgdoooAUCiSX2Hc7hQlcoeoJgA6jEVy1oFg7PhKcSJ3iOoCQDHue5VusdrkrVG4Vw16bXesHL9YkTtElQHQYSySO56J1wm6avOZJCA4vTp8d+y8hfZRihe5Q1QdAB3GIrmPVgMNgqfh81mMdqF3TuhbvU9rqhC5Q8wiABRjkXwRGgDPwufz3ucuurejXAqfb4lt9dpFVSJ3iNkEQIexSC6d6kTuELMLACWBSC6NakXuELMMgI5EIjlnqhe5Q8w6ADoSiuScmIXIHYIBEJhQJKdmViJ3CAbAG7hA0JEXXT9jNak0FS+3gorf/DMbkTsEA+AcEiwrSAUd/wIYAAP0WiOdeS1JI2iL8yjVGZulwgDYkzeWH+RaFboX8T2eu7jdFwbAEfSCoTvtbaph1G6WWbN8srVINcEAiEAQzn2zqhAma43mDAPAiBAU3Xqe/vqeTkfsqhrPe5/9tUPq7M/p7IQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhJC58X+y5Job7otcEQAAAABJRU5ErkJggg==" />
</svelte:head>

<div class="pikku-wrapper">
    <Sidebar/>
    {#if $showEditFieldModal}
        <EditFieldModal fields={fields} saveFields={saveFields}/>
    {/if}
    <div class="pikku-main tabbed">
        <div class="pikku-header tabbed">
            <div class="top-container">
                <div class="left-container">
                    <button on:click={() => goto('/pikku')} class="square-button" aria-label="back button">
                        <i class="bi bi-chevron-left"></i>
                    </button>
                    <p class="muted-text">Collections</p>
                    <p class="muted-text">/</p>
                    <p class="white-text">{collection}</p>
                </div>
                <div>
                    {#if tabContext === 'items'}
                        <button on:click={deleteCollection} class="secondary">Delete collection</button>
                        <button on:click={() => addItem()}>Add item</button>
                    {/if}

                    {#if tabContext === 'fields'}
                        <button on:click={() => showEditFieldModal.set(true)}>Edit fields</button>
                    {/if}
                </div>
            </div>
            <div class="bottom-container">
                {#each tabButtons as button}
                    <button on:click={() => setTab(button)} class={['tab-button', button === tabContext ? 'active' : '']}>{button}</button>
                {/each}
            </div>
        </div>
        <div class="pikku-content tabbed">
            {#if tabContext === 'items'} 
                {#if entries.length === 0}
                    <!-- <p class="white-text">No entries yet.</p> -->
                {:else}
                    <TableCollectionEntries collection={collection} entries={entries} fields={fields}/>
                {/if}
            {/if}

            {#if tabContext === 'fields'} 
                {#if fields.length === 0}
                    <!-- <p class="white-text">No fields yet.</p> -->
                {:else}
                    <TableCollectionFields fields={fields}/>
                {/if}
            {/if}
        </div>
    </div>
</div>