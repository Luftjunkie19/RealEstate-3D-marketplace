import { supabase } from "@/utils/supabase/client";

export async function POST (req:Request){


   const result = await supabase.auth.signInWithOAuth({provider:'discord', options:{
      redirectTo:'https://real-estate-3-d-marketplace.vercel.app/auth/callback'
   }});

  
   return Response.json(result);
}