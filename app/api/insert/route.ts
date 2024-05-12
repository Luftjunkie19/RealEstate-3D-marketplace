import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST (req:Request){


    const {collection, object}= await req.json();

      const supabaseDatabase= createClient(cookies());

      const data = await supabaseDatabase.from(collection).insert([object]);

      return Response.json(data);
}