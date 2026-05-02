import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xktefsprtkqbxvmgwbhl.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrdGVmc3BydGtxYnh2bWd3YmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MTQ0NDMsImV4cCI6MjA5MzI5MDQ0M30.SqFiynV7pERED-e8KCHxoj0hDIdD_lw6YM-Fg8rRLKU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)