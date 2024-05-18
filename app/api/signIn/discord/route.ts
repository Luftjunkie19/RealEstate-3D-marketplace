import { supabase } from "@/utils/supabase/client";

export async function POST (req:Request){


   const result = await supabase.auth.signInWithOAuth({provider:'discord', options:{
      redirectTo:window.location.origin
   }});

  
   return Response.json(result);
}