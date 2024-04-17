<script lang="ts">
    import {
        getDrawerStore,
        getModalStore,
        type ModalSettings,
    } from "@skeletonlabs/skeleton";

    const modalStore = getModalStore();
    const drawerStore = getDrawerStore();

    const modal: ModalSettings = {
        type: "component",
        component: "AuthModal",
    };

    function closeDrawer(): void {
        drawerStore.close();
    }

    const openAuthModal = (): void => {
        modalStore.trigger(modal);
        closeDrawer();
    };
</script>

<nav class="list-nav p-4">
    <ul>
        <li><a href="/" on:click={closeDrawer}>🏠 Home</a></li>
        <li>
            <a href="/plan" on:click={closeDrawer}>✏️ Plan</a>
        </li>
        <li>
            <a href="/record" on:click={closeDrawer}>🎙️ Record</a>
        </li>
        <li>
            <a href="/edit" on:click={closeDrawer}>✂️ Edit</a>
        </li>
        <li>
            <a href="/publish" on:click={closeDrawer}>🎉 Publish</a>
        </li>
        <li>
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a href="#" on:click|preventDefault={openAuthModal}
                >🔓 Login/Register</a
            >
        </li>
    </ul>
</nav>
