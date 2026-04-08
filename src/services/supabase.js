import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://lfhttoneqhaqfohtjeto.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmaHR0b25lcWhhcWZvaHRqZXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NjgwMDEsImV4cCI6MjA5MTI0NDAwMX0.9nkY0No5uSGJfUylBisTIG5wyuaTPSyP3WZP-p0cvSc"

export const supabase = createClient(supabaseUrl, supabaseKey)