import { supabase } from "@/utils/supabase/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(request:Request){

    const {email, password}= request.body;

    const result = await supabase.auth.signInWithPassword({email, password});


    return  Response.json(result);

}