import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API!
});

export async function POST(req:NextRequest){
    const {threadId}= await req.json();

    if(!threadId){
        return NextResponse.json({error:"ThreadId error"}, {status:401});
    }

    try {
        const threadMessages= await openai.beta.threads.messages.list(threadId);

        return NextResponse.json({messages:threadMessages.data, success:true}, {status:201});
        
    } catch (error) {
        return NextResponse.json({error:'Something went wrong', success:false}, {status:401})
    }
}