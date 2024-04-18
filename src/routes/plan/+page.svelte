<script lang="ts">
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import type { Plan } from "$lib/types/global";

    export let data;

    const modalStore = getModalStore();

    let plans: Plan[] = [];

    const modal: ModalSettings = {
        type: "component",
        component: "CreatePlanFormModal",
        title: "Create Plan",
        body: "Fill out the form below to create a new plan.",
        response: (data: Record<string, string>): void => {
            plans = [
                ...plans,
                {
                    id: "",
                    title: data.title,
                    description: null,
                    podcastId: null,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                } as Plan,
            ];
        },
    };

    const openCreatePlanModal = (): void => {
        modalStore.trigger(modal);
    };
</script>

<form class="">
    <button
        class="bg-blue-500 text-white px-4 py-2 rounded"
        on:click={openCreatePlanModal}
    >
        Create Plan
    </button>
</form>

<div class="mt-4 grid grid-flow-col auto-cols-max gap-4">
    {#each data.plans as plan}
        <li>{plan.title}</li>
    {/each}
</div>
