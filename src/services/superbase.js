// Creating a client from the database
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://udezvmaelemrkuterguy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkZXp2bWFlbGVtcmt1dGVyZ3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYwNjIxMDksImV4cCI6MjAzMTYzODEwOX0.TlqaQ2yBdEjoDY1mDrwerB49U0upVdQ2_qiz0nv7uY8'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase 