"use server";

import { Client, Environment } from "square";
import { randomUUID } from "crypto";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const { paymentsApi } = new Client({
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