import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(){
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API!
      });

      try {
        const thread= await openai.beta.threads.create();

        return NextResponse.json({thread, success:true});

      } catch (error) {
        return NextResponse.json({error:'Something went not correct', success:false});
        console.log(error);
      }

}