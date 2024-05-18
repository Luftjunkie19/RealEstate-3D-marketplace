import { supabase } from "@/utils/supabase/client";

export async function POST (req:Request){


   const result = await supabase.auth.signInWithOAuth({provider:'discord', options:{
      redirectTo: '/'
   }});

  
   return Response.json(result);
}