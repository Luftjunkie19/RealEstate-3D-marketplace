import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest, res:NextResponse)=>{
const {ticker}= await req.json();

const url = `https://real-time-finance-data.p.rapidapi.com/stock-quote?symbol=${ticker}&language=en`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.NEXT_RAPIDAPI_KEY as string,
		'X-RapidAPI-Host': process.env.NEXT_ASSETSAPI_HOST as string,
	  }
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	return NextResponse.json({result:result.data, errorMessage:null, success:true});
} catch (error) {
	console.error(error);
    return NextResponse.json({result:null, errorMessage:error, success:false})
}

}