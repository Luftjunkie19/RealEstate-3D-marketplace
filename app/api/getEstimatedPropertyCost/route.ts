import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {address, state, city, zipCode} = await req.json();

    const googleRes= await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${`${address}, ${city}, ${state}, ${zipCode}`}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`);
    
    const googleJsoned= await googleRes.json();

      const geometricPositions = googleJsoned.results[0].geometry.location;
  
      if(!geometricPositions){
        return NextResponse.json({error:'No address and positions'});
       }


    const url = `https://realty-mole-property-api.p.rapidapi.com/salePrice?latitude=${geometricPositions.lat}&longitude=${geometricPositions.lng}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': "1aafa51aa2msh3cce0b08b7f8909p1958a7jsn21053d9a4e71",
            'X-RapidAPI-Host': "realty-mole-property-api.p.rapidapi.com",
          }
    };
    
    try {
        const response = await fetch(url, {...options, mode:"no-cors"});
        const result = await response.json();
        return  NextResponse.json({result, errorMessage:null, success:true});
    } catch (error) {
        return  NextResponse.json({result:null, errorMessage:"No estimated property cost.", success:true});
    }

}