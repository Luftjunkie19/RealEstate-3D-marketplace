import { getMethods, } from "@/utils/urls";
import axios from "axios";


export async function getUsPropertyData(address:string, city:string, state:string, zip:number ){
    try {
        
 const options= {url:"https://realty-mole-property-api.p.rapidapi.com/properties", ...getMethods, params:{
    address,
    city,
    state,
    zip
 }};
 const response = await axios.request(options);
        const result = await response.data;
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

