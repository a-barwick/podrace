<script lang="ts">
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import type { Plan } from "$lib/types/global";
    import { supabase } from "$lib/supabaseClient";

    export let data;

    const modalStore = getModalStore();

    let plans: Plan[] = [];

    const modal: ModalSettings = {
        type: "component",
        component: "CreatePlanFormModal",
        title: "Create Plan",
        body: "Fill out the form below to create a new plan.",
        response: (data: Record<string, string>): void => {
            insertPlan({
                title: data.title,
            } as Plan);
        },
    };

    const openCreatePlanModal = (): void => {
        modalStore.trigger(modal);
    };

    const insertPlan = async (plan: Plan): Promise<void> => {
        const { error } = await supabase.from("plans").insert([plan]);
        if (error) {
            console.error(error);
            return;
        }
        refreshPlans();
    };

    const refreshPlans = async (): Promise<void> => {
        const { data, error } = await supabase.from("plans").select();
        if (error) {
            console.error(error);
            return;
        }
        console.log("SELECT * FROM plans", data);
        plans = data;
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
