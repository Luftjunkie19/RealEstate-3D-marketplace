import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API!
  });

export async function POST(req:NextRequest){
  const {assistantId, threadId}= await req.json();

  if(!assistantId || !threadId){
    return NextResponse.json({error:"Missing parameters", success:true}, {status: 400});
  }

  try {
    const run= await openai.beta.threads.runs.create(threadId, {
      assistant_id:assistantId
    });

    return NextResponse.json({run, success:true}, {status:201});
  } catch (error) {
    return NextResponse.json({error:'Something went not correct', success:false}, {status:401});
  }

}