import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase credentials
const URL = 'https://afxddrmaqvzlmxkwtfzb.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmeGRkcm1hcXZ6bG14a3d0ZnpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwOTg5ODIsImV4cCI6MjA3MTY3NDk4Mn0.Bl11XbL9pbl1OTAiM17hSs193TlyPdaW4eJZq06JGJU';

export const supabase = createClient(URL, API_KEY);