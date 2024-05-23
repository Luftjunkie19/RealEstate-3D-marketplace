import { getMethods } from "@/utils/urls"

type Props = {}

export default function getEstimatedUSRentPropertyCost(address:string, city:string, state:string, zipCode:number) {
    const options= {
        ...getMethods,
        url:'https://realty-mole-property-api.p.rapidapi.com/rentalPrice',
        params:{
            address:`${address}, ${city}, ${state}, ${zipCode}`
        }
    }
    
   
}