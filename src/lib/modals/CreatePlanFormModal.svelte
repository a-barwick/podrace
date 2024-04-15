<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import { getModalStore } from "@skeletonlabs/skeleton";

    export let parent: SvelteComponent;

    const modalStore = getModalStore();

    const formData = {
        title: "My Plan",
    };

    function onFormSubmit(): void {
        if ($modalStore[0].response) {
            $modalStore[0].response(formData);
        }
        modalStore.close();
    }
</script>

{#if $modalStore[0]}
    <div class="modal-example-form card p-4 w-modal shadow-xl space-y-4">
        <header class="text-2xl font-bold">
            {$modalStore[0].title ?? ""}
        </header>
        <article>{$modalStore[0].body ?? ""}</article>
        <form
            class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token"
        >
            <label class="label">
                <span>Name</span>
                <input
                    class="input"
                    type="text"
                    bind:value={formData.title}
                    placeholder="Enter title..."
                />
            </label>
        </form>
        <!-- prettier-ignore -->
        <footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit Form</button>
		</footer>
    </div>
{/if}
