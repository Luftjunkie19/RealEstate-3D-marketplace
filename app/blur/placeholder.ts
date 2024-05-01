import {getPlaiceholder} from 'plaiceholder';


export const getBase64= async (url:string)=>{
    try {
        const res= await fetch(url);

        if(!res.ok){
            throw new Error('Not ok.');
        }

        const buffer = await res.arrayBuffer();
        const {base64} = await getPlaiceholder(Buffer.from(buffer));

        return base64;
        
    } catch (error) {
        console.log(error);
    }
}