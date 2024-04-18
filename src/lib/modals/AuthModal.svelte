<script lang="ts">
    import { supabase } from "$lib/supabaseClient";
    import { Tab, TabGroup, getModalStore } from "@skeletonlabs/skeleton";
    import { user } from "$lib/stores";

    const modalStore = getModalStore();

    let tabSet = 0;
    let formData = {
        login: {
            email: "",
            password: "",
        },
        register: {
            name: "",
            email: "",
            password: "",
        },
    };

    async function onLoginSubmit(): Promise<void> {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: "example@email.com",
            password: "example-password",
        });
        user.set(data.user);
        modalStore.close();
    }

    async function onRegisterSubmit(): Promise<void> {
        const { data, error } = await supabase.auth.signUp({
            email: formData.register.email,
            password: formData.register.password,
            options: {
                emailRedirectTo: "/verify-email",
            },
        });
        user.set(data.user);
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
                                    bind:value={formData.login.email}
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
                                    bind:value={formData.login.password}
                                />
                            </div>
                            <div class="flex items-center justify-between">
                                <a href="/forgotpassword"> Forgot Password? </a>
                                <button
                                    class="btn variant-filled"
                                    type="button"
                                    on:click={onLoginSubmit}
                                >
                                    Sign In
                                </button>
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
                                    bind:value={formData.register.name}
                                    required
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
                                    bind:value={formData.register.email}
                                    required
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
                                    bind:value={formData.register.password}
                                    required
                                />
                            </div>
                            <div class="flex justify-end">
                                <button
                                    class="btn variant-filled"
                                    type="submit"
                                    on:click|preventDefault={onRegisterSubmit}
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
