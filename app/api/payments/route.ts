import { paymentsApi } from "@/utils/square/server";

export async function POST(req:Request){
const result = await paymentsApi.createPayment({
    sourceId: "",
    idempotencyKey: ""
});

}