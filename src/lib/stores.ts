import type { User } from "@supabase/supabase-js";
import { writable, type Writable } from "svelte/store";

export let user: Writable<User | null> = writable(null);
