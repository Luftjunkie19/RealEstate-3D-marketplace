import { supabase } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST (req:Request){


   const result = await supabase.auth.signInWithOAuth({provider:'google'});

   return Response.json(result);
}