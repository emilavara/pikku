<script>
	import { onMount } from "svelte";

    onMount(() => {
        document.body.style.margin = '0';
    })
</script>

<main>
    <div class="header">
        <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_49_30)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7117 0.528073C19.3753 -0.169011 17.5649 -0.178969 16.2165 0.516124C11.0521 3.18496 6.36769 6.24217 2.26286 9.63399C1.62752 10.1578 1.1774 10.9206 1.18537 11.8169C1.19334 12.7111 1.65142 13.462 2.28278 13.9778C6.35375 17.3059 11.0421 20.3671 16.1109 23.014C17.4493 23.7111 19.2578 23.7211 20.6061 23.026C25.7705 20.3571 30.4549 17.2999 34.5598 13.9081C35.1951 13.3843 35.6452 12.6215 35.6373 11.7252C35.6293 10.831 35.1692 10.0801 34.5399 9.56428C30.4689 6.2362 25.7805 3.175 20.7117 0.528073ZM17.5848 3.17102C17.8596 3.04887 18.1571 2.98625 18.4578 2.98728C18.7585 2.98831 19.0555 3.05296 19.3295 3.17699C24.1672 5.70243 28.6246 8.60827 32.4864 11.7452C28.6027 14.9338 24.1573 17.8297 19.2359 20.3711C18.7579 20.618 17.9751 20.616 17.4932 20.3651C12.6554 17.8397 8.19804 14.9338 4.3342 11.7969C8.21995 8.60828 12.6634 5.71239 17.5848 3.17102Z" fill="#ffffff"/>
                <path d="M36.7287 26.605C36.9383 26.941 37.0058 27.3464 36.9166 27.7322C36.8273 28.118 36.5885 28.4526 36.2527 28.6624L25.7207 35.2429C23.6136 36.5574 20.9806 37.1768 18.4113 37.1768C15.846 37.1768 13.2131 36.5594 11.1039 35.2449L0.703385 28.752C0.367171 28.5421 0.128137 28.2071 0.0388676 27.8209C-0.0504014 27.4347 0.0174069 27.0288 0.227376 26.6926C0.437345 26.3564 0.772275 26.1174 1.15848 26.0281C1.54469 25.9388 1.95055 26.0067 2.28676 26.2166L12.6873 32.7095C14.2268 33.6714 16.2862 34.1893 18.4133 34.1893C20.5404 34.1893 22.5998 33.6714 24.1394 32.7095L34.6713 26.131C34.8378 26.0269 35.0231 25.9567 35.2167 25.9243C35.4103 25.8918 35.6084 25.8979 35.7997 25.9421C35.9909 25.9863 36.1716 26.0678 36.3314 26.1819C36.4911 26.296 36.6268 26.4404 36.7307 26.607" fill="#ffffff" fill-opacity="0.25"/>
                <path d="M36.7287 19.1263C36.9383 19.4623 37.0058 19.8677 36.9166 20.2535C36.8273 20.6393 36.5885 20.9739 36.2527 21.1837L24.0896 28.7779C22.4385 29.8096 20.391 30.2856 18.4113 30.2856C16.4316 30.2856 14.3842 29.8076 12.7331 28.7799L0.703385 21.2713C0.36717 21.0616 0.128032 20.7269 0.0385758 20.3409C-0.05088 19.9549 0.016675 19.5491 0.22638 19.2129C0.436085 18.8767 0.770761 18.6376 1.15678 18.5481C1.54281 18.4587 1.94856 18.5262 2.28477 18.7359L14.3145 26.2445C15.3979 26.9217 16.8698 27.2981 18.4113 27.2981C19.9509 27.2981 21.4227 26.9197 22.5062 26.2425L34.6713 18.6503C35.0073 18.4407 35.4127 18.3731 35.7985 18.4624C36.1843 18.5516 36.5189 18.7904 36.7287 19.1263Z" fill="#ffffff" fill-opacity="0.5"/>
            </g>
            <defs>
                <clipPath id="clip0_49_30">
                    <rect width="36.955" height="37.1768" fill="white"/>
                </clipPath>
            </defs>
        </svg>
        <div class="header-text">
            <h1>welcome to pikku.</h1>
            <p>small. insanely fast. file-based.</p>
        </div>
    </div>
    <div class="info-blocks">
        <div class="info-block">
            <h2>Get started</h2>
            <ul>
                <li>
                    <a href="/pikku">Create a collection</a>
                </li>
                <li>
                    Define fields.
                </li>
                <li>
                    Add content.
                </li>
            </ul>
        </div>
        <div class="info-block">
            <h2>Where is your data?</h2>
            <p>All your content lives in /static/data as plain JSON.</p>
        </div>
        <p class="wipe">Wipe this file and get started.</p>
    </div>
    <div class="link-container">
        <a href="/pikku">Pikku Dashboard</a>
        <a href="/">Documentation</a>
        <a href="https://github.com/emilavara/pikku" target="_blank">GitHub</a>
    </div>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

    main {
        height: calc(100vh - 128px);
        width: 100%;
        background: #050505;
        color: white;
        padding: 64px 0;
        font-family: 'JetBrains Mono';
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h1, h2, p {
            margin: 0;
        }

        .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;

            .header-text {
                display: flex;
                flex-direction: column;
                gap: 8px;
                text-align: center;
                
                h1 {
                    font-size: 24px;
                }

                p {
                    font-size: 14px;
                    opacity: 0.50;
                }
            }
        }

        .info-blocks {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
            margin-bottom: 200px;

            .info-block {
                padding: 20px;
                display: flex;
                flex-direction: column;
                width: 312px;
                border: 1px solid #101010;
                gap: 12px;

                h2 {
                    font-size: 12px;
                    text-transform: uppercase;
                }

                p {
                    font-size: 12px;
                    opacity: 0.50;
                    line-height: 1.5;
                }

                ul {
                    padding-left: 12px;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;

                    li {
                        font-size: 12px;
                        color: white;
                        opacity: 0.50;

                        a {
                            color: white;
                        }
                    }
                }
            }

            .wipe {
                font-size: 12px;
                opacity: 0.25;
            }
        }

        .link-container {
            display: flex;
            gap: 32px;
            justify-content: center;

            a {
                font-size: 12px;
                opacity: 0.5;
                text-decoration: none;
                color: white;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>