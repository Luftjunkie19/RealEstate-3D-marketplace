import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API!
  });


export async function POST(req:NextRequest){
    const { runId, threadId } = await req.json();

    if(!runId || !threadId){
        return NextResponse.json({error:'No parameters provided', success:false}, {status:401});
    }

    try {
        const retrievedRun = await openai.beta.threads.runs.retrieve(threadId, runId);

        return NextResponse.json({run:retrievedRun, success:true}, {status:201});
        
    } catch (error) {
        return NextResponse.json({error, success:false}, {status:401});
    }

}