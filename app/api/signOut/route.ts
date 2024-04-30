import { supabase } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";


export async function POST (){
 
    const result = await supabase.auth.signOut();

    return Response.json(result);
}