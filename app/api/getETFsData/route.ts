import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest)=>{
const {ticker}= await req.json();

const url = `https://real-time-finance-data.p.rapidapi.com/stock-quote?symbol=${ticker}&language=en`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': "1aafa51aa2msh3cce0b08b7f8909p1958a7jsn21053d9a4e71",
		'X-RapidAPI-Host': "real-time-finance-data.p.rapidapi.com",
	  },
};

try {
	const response = await fetch(url, {...options, mode:'no-cors'});
	const result = await response.json();
	return NextResponse.json({result:result.data, errorMessage:null, success:true});
} catch (error) {
	console.error(error);
    return NextResponse.json({result:null, errorMessage:error, success:false})
}

}