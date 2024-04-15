<script lang="ts">
    import type { AfterNavigate } from "@sveltejs/kit";
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
    import { afterNavigate } from "$app/navigation";

    import "../app.pcss";
    import Navigation from "$lib/Navigation/Navigation.svelte";
    import CreatePlanFormModal from "../lib/modals/CreatePlanFormModal.svelte";

    // Required for Modal and Drawer
    initializeStores();

    const drawerStore = getDrawerStore();
    const currentYear = new Date().getFullYear();

    afterNavigate((params: AfterNavigate) => {
        const isNewPage = params.from?.url.pathname !== params.to?.url.pathname;
        const elemPage = document.querySelector("#page");
        if (isNewPage && elemPage !== null) {
            elemPage.scrollTop = 0;
        }
    });

    function toggleDrawer(): void {
        drawerStore.open({});
    }

    const modalRegistry: Record<string, ModalComponent> = {
        // Set a unique modal ID, then pass the component reference
        CreatePlanFormModal: { ref: CreatePlanFormModal },
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
    <svelte:fragment slot="pageFooter">
        <footer class="text-center py-4">
            &copy; {currentYear} Podracer. All rights reserved.
        </footer>
    </svelte:fragment>
</AppShell>
