import { NextRequest, NextResponse } from "next/server";

import axios from "axios";


export async function POST(req:NextRequest, res:NextResponse){
    const {address, city, state, zip}= await req.json();
    try {
        
 const options= {url:"https://realty-mole-property-api.p.rapidapi.com/properties",method: 'GET',
 headers: {
    'X-RapidAPI-Key': process.env.NEXT_RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.NEXT_REALESTATEAPI_HOST
  },
  params:{
    address,
    city,
    state,
    zip
 }};

 const response = await axios.request(options);
        const result = await response.data;
        return NextResponse.json({result, error:null});
    } catch (error) {
        return NextResponse.json({result:null, error});
        console.error(error);
    }
}

