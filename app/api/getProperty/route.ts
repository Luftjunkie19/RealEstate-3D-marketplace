import { NextRequest, NextResponse } from "next/server";

import axios from "axios";


export async function POST(req:NextRequest,){
    const {address, city, state, zip}= await req.json();
    try {
        
 const options= {url:"https://realty-mole-property-api.p.rapidapi.com/properties",method: 'GET',
 headers: {
    'X-RapidAPI-Key': "1aafa51aa2msh3cce0b08b7f8909p1958a7jsn21053d9a4e71",
    'X-RapidAPI-Host': 'realty-mole-property-api.p.rapidapi.com'
  },
  params:{
    address,
    city,
    state,
    zip
 }};

 const response = await axios.request(options);
        const result = await response.data;
        return NextResponse.json({result, errorMessage:null, success:true});
    } catch (error) {
        return NextResponse.json({result:null, errorMessage:error, success:false});
    }
}

