import { etfHeaders } from "@/utils/urls";
import axios from "axios";

export const getETFData=async (ticker:string)=>{

const options = {
  method: 'GET',
  url: 'https://real-time-finance-data.p.rapidapi.com/stock-quote',
  params: {
    query: ticker,
    language: 'en'
  },
...etfHeaders
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
}