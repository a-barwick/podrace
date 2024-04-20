<script lang="ts">
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import type { Plan } from "$lib/types/global";
    import { user } from "$lib/stores";
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";
    import type { PageData } from "../$types";

    const modalStore = getModalStore();
    export let data: PageData;
    let plans: Plan[] = [];

    const modal: ModalSettings = {
        type: "component",
        component: "CreatePlanFormModal",
        title: "Create Plan",
        body: "Fill out the form below to create a new plan.",
        response: (data: Record<string, string>): void => {
            refreshPlans();
        },
    };

    onMount(async () => {
        if (data) {
            console.log("loaded data", data);
            // plans = data.plans;
        }
    });

    const openCreatePlanModal = (): void => {
        modalStore.trigger(modal);
    };

    const refreshPlans = async (): Promise<void> => {
        const { data, error } = await supabase.from("plans").select();
        const rows = data as Plan[];
        if (error) {
            console.error(error);
            return;
        }
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
