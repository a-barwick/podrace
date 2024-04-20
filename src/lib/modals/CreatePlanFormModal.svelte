<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import { getModalStore } from "@skeletonlabs/skeleton";
    import { user } from "$lib/stores";
    import { supabase } from "$lib/supabaseClient";
    import type { Plan, PlanItem } from "$lib/types/global";

    export let parent: SvelteComponent;

    const modalStore = getModalStore();

    let curItem = "";
    let newItemInput: HTMLElement | null = null;
    let formData = {
        title: "",
        items: [] as string[],
    };

    $: isCreateButtonDisabled =
        !formData || !formData.title || formData.items.length === 0;

    async function createPlanWithItems() {
        if (!formData.title) {
            console.error("Title is missing.");
            return;
        }
        if (!$user) {
            console.error("User is missing.");
            return;
        }
        const { data: plans, error: planInsertError } = await supabase
            .from("plans")
            .insert([{ title: formData.title, user_id: $user.id } as Plan])
            .select();
        const plan_id = plans?.[0]?.id;
        if (!plan_id || planInsertError) {
            console.error("Error inserting plan.");
            return;
        }
        const { error: itemInsertError } = await supabase
            .from("plan_items")
            .insert(
                formData.items.map((item) => {
                    return {
                        user_id: $user?.id,
                        plan_id: plan_id,
                        content: item,
                    } as PlanItem;
                }),
            );
        if (itemInsertError) {
            console.error("Error inserting items.", itemInsertError);
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
        <form
            class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token"
        >
            <label class="label">
                <span>Add Items</span>
                <div
                    class="input-group input-group-divider grid-cols-[1fr_auto]"
                >
                    <input
                        type="text"
                        class="input"
                        placeholder="Enter new item..."
                        bind:value={curItem}
                        bind:this={newItemInput}
                    />
                    <button
                        class="btn variant-filled-primary"
                        on:click={() => {
                            if (curItem) {
                                formData.items = [curItem, ...formData.items];
                                curItem = "";
                                newItemInput?.focus();
                            }
                        }}>Add</button
                    >
                </div>
            </label>

            {#if formData.items.length > 0}
                <div class="table-container">
                    <table class="table table-fixed">
                        <thead>
                            <tr>
                                <th>Items</th>
                                <th class="w-1/4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each formData.items as item, i}
                                <tr class="align-middle">
                                    <td>{item}</td>
                                    <td>
                                        <button
                                            class="btn variant-filled-surface"
                                            on:click={() => {
                                                formData.items =
                                                    formData.items.filter(
                                                        (x, j) => i !== j,
                                                    );
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            {/if}
        </form>

        <!-- prettier-ignore -->
        <footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" disabled={isCreateButtonDisabled} on:click={createPlanWithItems}>Create</button>
		</footer>
    </div>
{/if}

<style>
    .table td {
        vertical-align: middle;
    }
</style>
