import { getMethods, realtyPropertyURL } from "@/utils/urls";


export async function getProperty(address:string, city:string, state:string, zip:string ){
    try {
        const response = await fetch(`${realtyPropertyURL}${address}${city}${state}${zip}`, getMethods);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

