const jwt = require('jsonwebtoken');

export async function POST(req:Request){
    const {roomId, participantId}= await req.json();

    const options = { 
        expiresIn: '120m', 
        algorithm: 'HS256' 
       };
       const payload = {
        apikey: process.env.NEXT_PUBLIC_VIDEOSDK_API,
        permissions: [`allow_join`], // `ask_join` || `allow_mod` 
        version: 2, //OPTIONAL
        participantId, //OPTIONAL 
        roles: ['crawler', 'rtc'], //OPTIONAL
        roomId,
       };
       
       const token = jwt.sign(payload, process.env.NEXT_PUBLIC_VIDEOSDK_API, options);
       
       return Response.json(token);
}