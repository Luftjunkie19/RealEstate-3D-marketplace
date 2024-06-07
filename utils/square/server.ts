"use server";

import { Client, Environment } from "square";
import { randomUUID } from "crypto";
import { supabase } from "../supabase/client";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const { paymentsApi, customersApi, cardsApi, subscriptionsApi, ordersApi} = new Client({
  accessToken: process.env.NEXT_PUBLIC_SQUARE_APP_ACCESS_TOKEN,
  environment:Environment.Sandbox
});


export async function submitPayment(sourceId:string, additionalPayment:number | null) {
  try {
    const additionalPaymentResult= 2000 + Number(additionalPayment as number * 100);
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: {
        currency: "USD",
        amount: additionalPayment !== null ? additionalPaymentResult : 2000 as any,
      },
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function createCustomerAccount(email:string, nickname:string){

  const response = await customersApi.createCustomer({
      emailAddress: email,
      nickname,
      idempotencyKey: crypto.randomUUID(),
    });
  
    return {customer:response.result.customer};
}

export async function createCardItem(customerId:string, cardHolderName:string, expYear:any, expMonth:any, sourceId:string){
  const response = await cardsApi.createCard({
    idempotencyKey: crypto.randomUUID(),
    sourceId,
    card: {
      expMonth,
      expYear,
      cardholderName:cardHolderName,
      customerId
    }
  });


  return {result:response.result};


}

export async function createOrder(customerId:string,catalogObjectId:string){
  const response = await ordersApi.createOrder({
    idempotencyKey: crypto.randomUUID(),
    order:{
      locationId: process.env.NEXT_PUBLIC_SQUARE_APP_SEC as string,
      customerId,
      lineItems:[{
        quantity:"1",
        catalogObjectId
      }],
      state: "DRAFT",
    },
  });

  return response.result.order;
}

export async function createSubscription(customerId:string, orderId:string, planId:string, cardId:string, ordinal:any){
  const response = await subscriptionsApi.createSubscription({
    idempotencyKey: crypto.randomUUID(),
    locationId: process.env.NEXT_PUBLIC_SQUARE_APP_SEC as string,
    customerId,
    cardId,
   phases:[
    {orderTemplateId:orderId, ordinal}
   ],
    planVariationId:planId,
  });

  console.log(response);

  return response.result;

}

export async function getSubscriptionDetails(id:string){
  const response = await subscriptionsApi.retrieveSubscription(id);

  return response.result;
}

export async function getOrder(id:string){
  const response = await ordersApi.retrieveOrder(id);

  return response.result;
}

export async function cancelSubscription(subsriptionId:string, userId:string){
const res= await subscriptionsApi.cancelSubscription(subsriptionId);
await supabase.from('users').update({is_subscribed:false, subscribtion_details:null}).eq('user_id', userId);
return res.result;
}

export async function pauseSubscription(subscriptionId:string){
  const response= await subscriptionsApi.pauseSubscription(subscriptionId, {

  });
  console.log(response.result);

  return response.result;
}

export async function resumeSubscription(subscriptionId:string){
  const response = await subscriptionsApi.resumeSubscription(subscriptionId,{
   
  });

  return response.result;
}


export async function swapSubscription(subscriptionId:string, swapPlan:string){
  const response = await subscriptionsApi.swapPlan(subscriptionId, {
  newPlanVariationId:swapPlan,
  });

  return response.result;
}