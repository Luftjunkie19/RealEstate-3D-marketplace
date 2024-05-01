import { supabase } from "@/utils/supabase/client";

export async function POST(req:Request){
    const {collection, validationTerm, value}= await req.json();


    const data= await supabase.from(collection).select('*').eq(validationTerm, value).limit(1);

    return Response.json(data.data);
}