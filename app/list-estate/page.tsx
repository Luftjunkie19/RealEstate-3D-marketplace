"use client";
import React, {
  ChangeEvent,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCamera } from 'react-icons/fa6';
import { PaymentForm } from 'react-square-web-payments-sdk';

import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { submitPayment } from '@/utils/square/server';
import { supabase } from '@/utils/supabase/client';

import DimensionalPlanner
  from '../components/list-estate/3D-presentation/DimensionalPlanner';
import PayableOffers from '../components/list-estate/PayableOffers';
import PayForm from '../components/list-estate/PayForm';

type Props = {}

function Page({}: Props) {
  const router= useRouter();
  const {user}=useAuthContext();
  const [currentStep, setCurrentStep]=useState(1);
  const [objectToInsert, setObjectToInsert]=useState<Object | null>(null);
  const [object3D, set3dObject]=useState<Object | null>(null);
  const [selectedOfferOption, setSelectedOfferOption]=useState<number | null>(null);
  const [images, setImages] = useState<File[]>([]); // Set initial state to an array of Files


  const set3DFunction=(object:any | null)=>{
    set3dObject(object);
    setCurrentStep(3);
  }


  const formAction = async (formData: FormData) => {
    try {
      // Extract form data
      const propertyName = formData.get('property-name');
      const propertyPrice = formData.get('property-price');
      const squareFootage = formData.get('sqr-footage');
      const propertyDescription = formData.get('description');
      const bathroomsQty = formData.get('bathrooms');
      const bedroomsQty = formData.get('bedrooms');
      const providedAddress = formData.get('property-address');
      const isForRent = formData.get('isForRent');

      if(!propertyName || !propertyPrice || !squareFootage || !propertyDescription || !bathroomsQty || !bedroomsQty || !providedAddress ){
        return toast.error('Please fill all the required fields');
       }
  
     
      // Fetch geocode data
      const fetchData = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${providedAddress}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`);
      const fetchResult = await fetchData.json();

      const address = fetchResult.results[0].formatted_address;
      const geometricPositions = fetchResult.results[0].geometry.location;
  
      if(!address || !geometricPositions){
        return toast.error('Please address accessed.');
       }

       if(images.length === 0){
        return toast.error('Please provide at least one image of the property');
       }


       if(images.length > 6){
        return toast.error('Only 6 images are possible to add.');
       }


      // Upload images
      const uploadedImageUrls: string[] = [];
      for (const image of images) {
        const { data:propertyImage, error } = await supabase.storage.from('property_images').upload(`${user?.id}/${propertyName}/${image.name}`, image);
      
        if (error) {
          console.error('Error uploading image:', error);
        } else {
          const {data}= supabase.storage.from('property_images').getPublicUrl(`${user?.id}/${propertyName}/${image.name}`);
          uploadedImageUrls.push(data.publicUrl || ''); // Assuming Key contains the URL or identifier of the uploaded image
        }
      }
  
      setObjectToInsert({
        object: {
          listed_by: user?.id,
          address,
          rent_offer: isForRent ? true : false,
          geometric_positions: geometricPositions,
          bathrooms: Number(bathroomsQty),
          bedrooms: Number(bedroomsQty),
          square_footage: Number(squareFootage),
          description: propertyDescription,
          price: Number(propertyPrice),
          property_name: propertyName,
          images: uploadedImageUrls,
          
        },
        collection: 'listings'
      });

      toast.success('Property object Successfully created !');
      setCurrentStep(2);

  
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while adding the property');
    }
  };

  const selectOption= (param:number)=>{
    setSelectedOfferOption(param);
  }
  
  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      toast.error('No image uploaded');
      return;
    }
  
    if (e.target.files.length > 6) {
      toast.error('Too many images uploaded. Maximum 6 images.');
      return;
    }
  
    setImages(Array.from(e.target.files));
  };
  
  const finalAmount= selectedOfferOption ?  (20 + (selectedOfferOption)).toFixed(2) : 20.00



  return (
<PaymentForm createPaymentRequest={() => ({
        countryCode: "US",
        currencyCode: "USD",
        lineItems: [
          {
            amount: `${finalAmount}`,
            label: "Fee to list the real estate",
          }
        ],
        total: {
          amount: `${finalAmount}`,
          label: "Basical Fee + Promotion Fee",
        },
      })}  cardTokenizeResponseReceived={async (token) => {
  if(token.token){
   const submitedPayment= await submitPayment(token.token, selectedOfferOption);
   if(!submitedPayment!.errors && submitedPayment!.payment!.status === "COMPLETED"){
  await fetch('/api/insert', {method:'POST', 
     body:JSON.stringify({
       object: {
         ...(objectToInsert as any)!.object, presentation_object: object3D, is_promoted: Number(submitedPayment?.payment?.amountMoney?.amount) - 2000 > 0 ? true : false, promotion_details: Number(submitedPayment?.payment?.amountMoney?.amount) - 2000 > 0 ? {
           paidAmount: Number(submitedPayment?.payment?.amountMoney?.amount) - 2000,
           currency: submitedPayment?.payment?.amountMoney?.currency,
           receiptUrl: submitedPayment?.payment?.receiptUrl,
           orderId: submitedPayment?.payment?.orderId,
           paymentId: submitedPayment?.payment?.id,
         } : null
       }, collection: (objectToInsert as any).collection
     }), 
     headers:{
      'Content-Type':'application/json'
    }}).then((res)=>res.json()).then((data)=>console.log(data));
    setCurrentStep(4);
    toast.success('Successfully paid the fee for publishing');  
   }
  }
        console.log(token);
      }}  locationId={process.env.NEXT_PUBLIC_SQUARE_APP_SEC} applicationId={process.env.NEXT_PUBLIC_SQUARE_APP_ID}>
<div className="min-h-screen w-screen overflow-x-hidden">
      <div className="mx-auto m-0 flex justify-center p-4">
      <ul className="steps">
  <li data-content='📝' className={`step ${currentStep > 0 && 'step-primary'} `}></li>
  <li data-content='🏠' className={`step ${currentStep > 1 && 'step-primary'}`}></li>
  <li className={`step ${currentStep > 2 && 'step-primary'}`} data-content='💸'></li>
  <li className={`step ${currentStep > 3 && 'step-primary'}`} data-content="✅"></li>
</ul>
      </div>

{currentStep === 1 &&
          <form action={formAction} className="mx-auto p-6 my-8 max-w-6xl bg-darkGray rounded-lg flex flex-col gap-3">
              <p className="text-2xl text-white font-bold">List your Real Estate</p>



                  <div className="grid w-full sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      <div className="flex col-span-1 flex-col gap-2">
                        <p className="text-white font-semibold">Propety Name</p>
                        <input name="property-name"  className="p-2 outline-none rounded-lg"/>
                      </div>

                       <div className="flex col-span-1 flex-col gap-2">
                        <p className="text-white font-semibold">Price</p>
                        <input name="property-price" type='number' className="p-2 outline-none rounded-lg"/>
                      </div>

                        <div className="flex flex-col gap-2 col-span-1 cursor-default">
                        <p className="text-white font-semibold">Address, City</p>
                        <input name="property-address" className="p-2 outline-none rounded-lg"/>
                      </div>

                        <div className="flex flex-col gap-2 col-span-1">
                        <p className="text-white font-semibold">Square footage m^2</p>
                        <input name="sqr-footage" type='number' className="p-2 outline-none rounded-lg"/>
                      </div>

                       <div className="flex col-span-1 flex-col gap-2">
                        <p className="text-white font-semibold">Bedrooms</p>
                        <input name="bedrooms" type='number' className="p-2 outline-none rounded-lg"/>
                      </div>

                       <div className="flex flex-col gap-2 col-span-1">
                        <p className="text-white font-semibold">Bathrooms</p>
                        <input name="bathrooms" type='number' className="p-2 outline-none rounded-lg"/>
                      </div>

                  

                      
</div>
         
<div className="flex flex-col gap-2">
  <p className='text-white font-bold text-xl'>Is for rent?</p>
  <input name='isForRent' type="checkbox"  className="toggle toggle-lg checked:text-purple checked:bg-purple" />
</div>


<div className="flex flex-col gap-4">
                  <p className='font-bold text-white text-xl flex gap-2 items-center'><FaCamera size={24} className='text-purple'/> Images</p>
                  <input onChange={handleImages} name="images" type="file" multiple  className="file-input outline-none text-white  bg-purple w-full max-w-xs" accept="image/*" />
</div>
              

              <div className="flex gap-4 flex-col max-w-2xl w-full">
                  <p className="text-xl text-white font-semibold">Description</p>
                  <textarea className="border-2 outline-none text-white h-36 border-purple p-1 rounded-lg resize-none " name="description"></textarea>
              </div>

<button type="submit" className='self-end max-w-60 w-full text-white text-lg font-semibold bg-purple p-2 rounded-xl'>List your property</button>
          </form>
}


{currentStep === 2 && 
<DimensionalPlanner moveForward={()=>setCurrentStep(3)} object3D={object3D} set3dObject={set3DFunction}/>
}

{currentStep === 3 && <div className='flex flex-col gap-6 p-4'>
<PayableOffers selectOption={selectOption} selectedOption={selectedOfferOption}/>
  <PayForm selectedOption={selectedOfferOption}/>
</div> }




{currentStep === 4 && <div className='w-full flex flex-col gap-6 items-center bg-darkGray p-4 rounded-xl max-w-xs mx-auto m-0'>
  <FaCheckCircle className=' text-green-500 text-5xl'/>
  <p className='text-white text-xl font-bold'>Your property has been listed !</p>
  <p className=' text-xs text-white'>In a second you will be redirected to the main page.</p>
  <button className='bg-purple p-2 rounded-lg text-white font-semibold' onClick={async()=>{
    router.push('/');

}}>Go back to main page.</button>
  </div>}


    </div>
    </PaymentForm>
  )
}

export default Page