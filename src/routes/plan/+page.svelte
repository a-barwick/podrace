<script lang="ts">
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import type { Plan } from "$lib/types/global";
    import { user } from "$lib/stores";
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";

    export let data;
    const modalStore = getModalStore();
    let plans: Plan[] = [];

    const modal: ModalSettings = {
        type: "component",
        component: "CreatePlanFormModal",
        title: "Create Plan",
        body: "Fill out the form below to create a new plan.",
        response: (data: Record<string, string>): void => {
            insertPlan(data.title);
        },
    };

    onMount(async () => {
        await refreshPlans();
    });

    const openCreatePlanModal = (): void => {
        modalStore.trigger(modal);
    };

    const insertPlan = async (title: string): Promise<void> => {
        if (!title) {
            console.error("Title is missing.");
            return;
        }
        if (!$user) {
            console.error("User is missing.");
            return;
        }
        const { error } = await supabase
            .from("plans")
            .insert([{ title, user_id: $user.id } as Plan]);
        if (error) {
            console.error(error);
            return;
        }
        plans = [...plans, { title }];
    };

    const refreshPlans = async (): Promise<void> => {
        const { data, error } = await supabase.from("plans").select();
        const rows = data as Plan[];
        if (error) {
            console.error(error);
            return;
        }
        console.log("SELECT * FROM plans", rows);
        plans = rows;
    };
</script>

<form class="">
    <button class="btn variant-filled" on:click={openCreatePlanModal}>
        Create Plan
    </button>
</form>

<div class="mt-4 grid grid-flow-col auto-cols-max gap-4">
    <ul>
        {#each plans as plan}
            <li>{plan.title}</li>
        {/each}
    </ul>
</div>
