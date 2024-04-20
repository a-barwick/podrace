<script lang="ts">
    import { onMount } from "svelte";
    import type { AfterNavigate } from "@sveltejs/kit";
    import { afterNavigate } from "$app/navigation";
    import {
        AppBar,
        AppShell,
        LightSwitch,
        initializeStores,
        Drawer,
        getDrawerStore,
        Modal,
        type ModalComponent,
    } from "@skeletonlabs/skeleton";

    import { user, session } from "$lib/stores";
    import { supabase } from "$lib/supabaseClient";
    import { constants } from "$constants";

    import Navigation from "$lib/Navigation/Navigation.svelte";
    import CreatePlanFormModal from "$lib/modals/CreatePlanFormModal.svelte";
    import AuthModal from "$lib/modals/AuthModal.svelte";

    import "../app.pcss";

    // Required for Modal and Drawer components
    initializeStores();

    const drawerStore = getDrawerStore();

    /**
     * Sets the session if the user is already logged in
     */
    onMount(async () => {
        const accessToken = localStorage.getItem(
            constants.auth.SUPABASE_STORAGE_KEY_AUTH_TOKEN,
        );
        const refreshToken = localStorage.getItem(
            constants.auth.SUPABASE_STORAGE_KEY_REFRESH_TOKEN,
        );

        if (accessToken && refreshToken) {
            const { data, error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
            });
            if (error) {
                console.error(error);
                return;
            }
            user.set(data.user);
            session.set(data.session);
        }
    });

    /**
     * Resets the scroll position when navigating to a new page
     */
    afterNavigate((params: AfterNavigate) => {
        const isNewPage = params.from?.url.pathname !== params.to?.url.pathname;
        const elemPage = document.querySelector("#page");
        if (isNewPage && elemPage !== null) {
            elemPage.scrollTop = 0;
        }
    });

    /**
     * Toggles the drawer
     */
    function toggleDrawer(): void {
        drawerStore.open({});
    }

    /**
     * Registers variations of modals
     */
    const modalRegistry: Record<string, ModalComponent> = {
        CreatePlanFormModal: { ref: CreatePlanFormModal },
        AuthModal: { ref: AuthModal },
    };
</script>

<Drawer>
    <Navigation />
</Drawer>

<Modal components={modalRegistry} />

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 md:w-64">
    <!-- Header -->
    <svelte:fragment slot="header">
        <AppBar>
            <svelte:fragment slot="lead">
                <button
                    class="md:hidden btn btn-sm mr-4"
                    on:click={toggleDrawer}
                >
                    <span>
                        <svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
                            <rect width="100" height="20" />
                            <rect y="30" width="100" height="20" />
                            <rect y="60" width="100" height="20" />
                        </svg>
                    </span>
                </button>
                <h1 class="text-2xl font-bold">
                    <a href="/">Podrace</a>
                </h1>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                {#if $user}
                    <p class="mr-4">{$user.email}</p>
                {/if}
                <LightSwitch />
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>

    <!-- Sidebar -->
    <svelte:fragment slot="sidebarLeft">
        <Navigation />
    </svelte:fragment>

    <!-- Main Content -->
    <main class="container mx-4 py-8">
        <slot />
    </main>

    <!-- Footer -->
    <!-- <svelte:fragment slot="pageFooter">
        <footer class="text-center py-4">
            &copy; {new Date().getFullYear()} Podracer. All rights reserved.
        </footer>
    </svelte:fragment> -->
</AppShell>
