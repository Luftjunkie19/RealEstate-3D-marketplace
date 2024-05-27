import { supabase } from "@/utils/supabase/client";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function POST(request:Request){

    const cookie= cookies();
    const {email, password, username}= await request.json();

    console.log(email, password);


    const containsInDatabase= await supabase.from('users').select('*').eq('email', email);

    if (containsInDatabase.data?.length === 0){
        const signedUpUser= await supabase.auth.signUp({email, password});

      await supabase.from('users').insert({
            email:email,
            user_name:username,
            profile_image:null,
            created_at: new Date()
        });

        return Response.json(signedUpUser);

    }
        const signedInUser= await supabase.auth.signInWithPassword({email, password});

        redirect('/');

    return Response.json(signedInUser);

}