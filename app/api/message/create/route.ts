import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API!
});

export async function POST(req:NextRequest){

    const {threadId, message}= await req.json();

    if(!threadId || !message){
        return NextResponse.json({error:"Missing parameters", succeess:false}, {status: 400});
    }

    try {
        const threadMessage= await openai.beta.threads.messages.create(threadId, {
            role:'user',
            content:message
        });

        return NextResponse.json({message:threadMessage, success:true}, {status:201});
    } catch (error) {
        console.log(error);

        return NextResponse.json({error:'Something went not correct', success:false}, {status:500})
        
    }

}