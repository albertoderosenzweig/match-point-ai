import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pvlgppltohtckjevaqfn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJz';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);