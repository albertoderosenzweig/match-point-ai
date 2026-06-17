import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pvlgppltohtckjevaqfn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2bGdwcGx0b2h0Y2tqZXZhcWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1ODgwMzYsImV4cCI6MjA5NjE2NDAzNn0.oXwFUC9ywQe-kRnETpY_qx03Fg3AQpDFLMXNwPSVNZk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type RevenueScenario = {
  id?: string;
  created_at?: string;
  name: string;
  segment: "starter" | "pro";
  plan: "basic" | "growth" | "enterprise";
  num_courts: number;
  occupancy_rate: number;
  avg_price_per_hour: number;
  monthly_members: number;
  membership_fee: number;
  monthly_revenue: number;
  annual_revenue: number;
  platform_fee: number;
  net_revenue: number;
};