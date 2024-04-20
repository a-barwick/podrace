import { supabase } from "$lib/supabaseClient";
import type { Plan } from "$lib/types/global";

export async function load(): Promise<{ plans: Plan[] }> {
    const { data, error } = await supabase.from("plans").select();
    console.log(data, error);
    return {
        plans: data ?? [],
    };
}
