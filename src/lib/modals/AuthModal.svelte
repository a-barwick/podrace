<script lang="ts">
    import { supabase } from "$lib/supabaseClient";
    import { Tab, TabGroup, getModalStore } from "@skeletonlabs/skeleton";
    import { session, user } from "$lib/stores";
    import { constants } from "$constants";

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
    let loginError = "";

    async function onLoginSubmit(): Promise<void> {
        loginError = "";
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.login.email,
            password: formData.login.password,
        });
        if (error) {
            loginError = error.message;
            return;
        }
        localStorage.setItem(
            constants.auth.SUPABASE_STORAGE_KEY_AUTH_TOKEN,
            data.session.access_token,
        );
        localStorage.setItem(
            constants.auth.SUPABASE_STORAGE_KEY_REFRESH_TOKEN,
            data.session.refresh_token,
        );
        user.set(data.user);
        session.set(data.session);
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

<svelte:head>
    <!-- Uncomment to load Google GIS script -->
    <!-- <script src="https://accounts.google.com/gsi/client" async></script> -->
</svelte:head>

{#if $modalStore[0]}
    <div class="modal-example-form card p-4 w-modal shadow-xl space-y-4">
        <TabGroup justify="justify-center">
            <Tab bind:group={tabSet} name="tab1" value={0}>Login</Tab>
            <Tab bind:group={tabSet} name="tab2" value={1}>Register</Tab>
            <svelte:fragment slot="panel">
                {#if tabSet === 0}
                    <div class="card p-4">
                        {#if loginError}
                            <aside class="alert variant-ghost">
                                <div class="alert-message">
                                    <h3 class="h3">Error logging in</h3>
                                    <p>{loginError}</p>
                                </div>
                            </aside>
                        {/if}
                        <form class="my-4">
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
                        <!-- Google GIS Button -->
                        <!-- <div class="my-4">
                            <div
                                id="g_id_onload"
                                data-client_id="448648448961-apca176uiir5nu554t4m33if8k5chqck.apps.googleusercontent.com"
                                data-context="signin"
                                data-ux_mode="popup"
                                data-callback="handleSignInWithGoogle"
                                data-nonce=""
                                data-auto_select="true"
                                data-itp_support="true"
                            ></div>

                            <div
                                class="g_id_signin"
                                data-type="standard"
                                data-shape="pill"
                                data-theme="outline"
                                data-text="signin_with"
                                data-size="large"
                                data-logo_alignment="left"
                            ></div>
                        </div> -->
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
                        <!-- Google GIS Button -->
                        <!-- <div class="my-4">
                            <div
                                id="g_id_onload"
                                data-client_id="448648448961-apca176uiir5nu554t4m33if8k5chqck.apps.googleusercontent.com"
                                data-context="signin"
                                data-ux_mode="popup"
                                data-callback="handleSignInWithGoogle"
                                data-auto_select="true"
                                data-itp_support="true"
                            ></div>

                            <div
                                class="g_id_signin"
                                data-type="standard"
                                data-shape="rectangular"
                                data-theme="outline"
                                data-text="signin_with"
                                data-size="large"
                                data-logo_alignment="left"
                            ></div>
                        </div> -->
                    </div>
                {/if}
            </svelte:fragment>
        </TabGroup>
    </div>
{/if}
