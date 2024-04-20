import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://rgsgwfpffclpuolyqxaf.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnc2d3ZnBmZmNscHVvbHlxeGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyMzM5MjgsImV4cCI6MjAyODgwOTkyOH0.v_9IpXC7H5C4Yk4CrN54T2KPnFPSXfO49TIsF4rHvS4"
);
