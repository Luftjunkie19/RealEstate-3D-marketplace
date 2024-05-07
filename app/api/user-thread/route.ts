import { supabase } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API!
  });

export async function POST(req:NextRequest){

    const {currentUser}= await req.json();

    if(!currentUser){
        return NextResponse.json({message:"Unauthorized", success:false}, {status:401});
    }

    const {data}= await supabase.from('user_threads').select('*').eq('userId', currentUser.id).limit(1);

    if(data?.length !== 0 && data){
        return NextResponse.json({userThread:data[0].threadId, success:true});
    }

try {
    const newUserThread= await openai.beta.threads.create();
    await supabase.from('user_threads').insert({
        userId:currentUser.id,
        threadId:newUserThread.id
    });

    return NextResponse.json({userThread:newUserThread, success:true}, {status:201});
} catch (error) {
    return NextResponse.json({error:'Unsuccessfull creation of thread'}, {status:400});
}

};
