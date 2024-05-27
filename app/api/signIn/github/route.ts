import { supabase } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST (req:Request){

   const result = await supabase.auth.signInWithOAuth({provider:'github', options:{
  redirectTo:'https://real-estate-3-d-marketplace.vercel.app'
   }});

  
   return Response.json(result);
}