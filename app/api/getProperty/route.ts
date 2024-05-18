import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {country, propertyData}= await req.json();
}