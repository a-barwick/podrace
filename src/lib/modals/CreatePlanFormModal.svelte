<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import { getModalStore } from "@skeletonlabs/skeleton";
    import { user } from "$lib/stores";
    import { supabase } from "$lib/supabaseClient";
    import type { Plan } from "$lib/types/global";
    import Form from "$lib/components/PlanItemForm/PlanItemForm.svelte";

    export let parent: SvelteComponent;

    const modalStore = getModalStore();

    const formData = {
        title: "My Plan",
        items: ["Walk the dog", "Buy groceries", "Clean the house"] as string[],
    };

    async function createPlanWithItems() {
        if (!formData.title) {
            console.error("Title is missing.");
            return;
        }
        if (!$user) {
            console.error("User is missing.");
            return;
        }
        const { error } = await supabase
            .from("plans")
            .insert([{ title: formData.title, user_id: $user.id } as Plan]);
        if (error) {
            console.error(error);
            return;
        }
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
                <span>Plan Name</span>
                <input
                    class="input"
                    type="text"
                    bind:value={formData.title}
                    placeholder="Enter title..."
                />
            </label>
        </form>
        <Form />
        <!-- prettier-ignore -->
        <footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={createPlanWithItems}>Create</button>
		</footer>
    </div>
{/if}
