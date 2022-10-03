import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qlmkpgkdiglsdlgxghcm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbWtwZ2tkaWdsc2RsZ3hnaGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQzNzY1MDksImV4cCI6MTk3OTk1MjUwOX0.ue-ZVOXyGv80vDPtmMeeHp2-A1y_YB1AgbMg6OWX5gQ"
);
