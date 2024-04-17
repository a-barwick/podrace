<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import { Tab, TabGroup, getModalStore } from "@skeletonlabs/skeleton";

    const modalStore = getModalStore();

    let tabSet = 0;

    function onLoginSubmit(): void {
        // if ($modalStore[0].response) {
        //     $modalStore[0].response(formData);
        // }
        modalStore.close();
    }

    function onRegisterSubmit(): void {
        // if ($modalStore[0].response) {
        //     $modalStore[0].response(formData);
        // }
        modalStore.close();
    }
</script>

{#if $modalStore[0]}
    <div class="modal-example-form card p-4 w-modal shadow-xl space-y-4">
        <TabGroup justify="justify-center">
            <Tab bind:group={tabSet} name="tab1" value={0}>Login</Tab>
            <Tab bind:group={tabSet} name="tab2" value={1}>Register</Tab>
            <svelte:fragment slot="panel">
                {#if tabSet === 0}
                    <div class="card p-4">
                        <form class="mt-4">
                            <div class="mb-6">
                                <label for="email" class="label mb-2"
                                    >Email</label
                                >
                                <input
                                    type="email"
                                    id="email"
                                    class="input"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div class="mb-6">
                                <label for="password" class="label mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    class="input"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div class="flex items-center justify-between">
                                <button
                                    class="btn variant-filled"
                                    type="button"
                                    on:click={onLoginSubmit}
                                >
                                    Sign In
                                </button>
                                <a href="/forgotpassword"> Forgot Password? </a>
                            </div>
                        </form>
                    </div>
                {:else if tabSet === 1}
                    <div class="card p-4">
                        <form class="mt-4">
                            <div class="mb-6">
                                <label for="email" class="label mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    class="input"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div class="mb-6">
                                <label for="email" class="label mb-2"
                                    >Email</label
                                >
                                <input
                                    type="email"
                                    id="email"
                                    class="input"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div class="mb-6">
                                <label for="password" class="label mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    class="input"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div class="flex items-center justify-between">
                                <button
                                    class="btn variant-filled"
                                    type="button"
                                    on:click={onRegisterSubmit}
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                {/if}
            </svelte:fragment>
        </TabGroup>
    </div>
{/if}
