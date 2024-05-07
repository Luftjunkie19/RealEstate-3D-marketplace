import { paymentsApi } from "@/utils/square/server";
import { NextResponse } from "next/server";

export async function POST(req:Request){

    try{
        const {sourceId}= await req.json();
        

        console.log(sourceId);
        

        const response = await paymentsApi.createPayment({
            sourceId: 'cnon:card-nonce-ok',
            idempotencyKey: 'b7fb99d3-848a-46f1-b351-4356fd6de626',
            amountMoney: {
              amount: 2500,
              currency: 'USD'
            }
          });
        
          return NextResponse.json(response);

    }catch(err){
        return NextResponse.json({err},{status:401} );
    }
 

}