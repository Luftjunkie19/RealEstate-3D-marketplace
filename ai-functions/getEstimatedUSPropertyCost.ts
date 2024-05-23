import { getMethods } from "@/utils/urls";
import axios from "axios";

export async function getEstimatedRentUSPropertyCost(address:string, city:string, state:string,zipCode:number) {
const options= {
    ...getMethods,
    url:'https://realty-mole-property-api.p.rapidapi.com/salePrice',
    params:{
        address:`${address}, ${city}, ${state}, ${zipCode}`
    }
}

const response= await axios.request(options);


}

