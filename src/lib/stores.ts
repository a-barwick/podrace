import type { Session, User } from "@supabase/supabase-js";
import { writable, type Writable } from "svelte/store";

export let user: Writable<User | null> = writable(null);

export let session: Writable<Session | null> = writable(null);
