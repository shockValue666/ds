import { createClient } from '@supabase/supabase-js'

console.log("supabase url : ", process.env.REACT_APP_SUPABASE_URL)
console.log("supabase key : ", process.env.REACT_APP_SUPABASE_ANON_KEY)

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseUrl = "https://tkdtgwtwpoiwwceroiao.supabase.co"
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrZHRnd3R3cG9pd3djZXJvaWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYxODAxMjEsImV4cCI6MTk4MTc1NjEyMX0.vDm39yWpDDaIGPbI_YvQeVPDS-kaa5LwMCqMKaaPSDs"


export const supabase = createClient(supabaseUrl, supabaseAnonKey)