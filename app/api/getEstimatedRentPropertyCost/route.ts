import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res:NextResponse){
    const {address, state, city, zipCode} = await req.json();

    const googleRes= await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${`${address}, ${city}, ${state}, ${zipCode}`}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`);
    
    const googleJsoned= await googleRes.json();

      const geometricPositions = googleJsoned.results[0].geometry.location;
  
      if(!geometricPositions){
        return NextResponse.json({error:'No address and positions'});
       }

    const url = `https://realty-mole-property-api.p.rapidapi.com/rentalPrice?latitude=${geometricPositions.lat}&longitude=${geometricPositions.lng}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_RAPIDAPI_KEY as string,
            'X-RapidAPI-Host': process.env.NEXT_REALESTATEAPI_HOST as string,
          }
    };
    try {
        const response = await fetch(url, options);
        return NextResponse.json({result:await response.json(), errorMessage:null, success:true});
        
    } catch (error) {
        return NextResponse.json({result:null, errorMessage:error, success:true});
    }

}