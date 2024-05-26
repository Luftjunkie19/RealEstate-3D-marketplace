import { supabase } from "@/utils/supabase/client";

export async function POST (req:Request){


   const result = await supabase.auth.signInWithOAuth({provider:'discord', options:{
      redirectTo:'http://localhost:3000'
   }});

  
   return Response.json(result);
}