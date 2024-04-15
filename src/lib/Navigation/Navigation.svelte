<script lang="ts">
    import { getDrawerStore } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();

    function closeDrawer(): void {
        drawerStore.close();
    }
</script>

<nav class="list-nav p-4">
    <ul>
        <li><a href="/" on:click={closeDrawer}>🏠 Home</a></li>
        <li><a href="/plan" on:click={closeDrawer}>✏️ Plan</a></li>
        <li><a href="/record" on:click={closeDrawer}>🎙️ Record</a></li>
        <li><a href="/edit" on:click={closeDrawer}>✂️ Edit</a></li>
        <li><a href="/publish" on:click={closeDrawer}>🎉 Publish</a></li>
    </ul>
</nav>
