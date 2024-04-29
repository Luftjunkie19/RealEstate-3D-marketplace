"use client";
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast';

import { FaCamera } from 'react-icons/fa6'

type Props = {}

function Page({}: Props) {

    
    const [images, setImages] = useState<string | any>([]);

    const formAction = async (formData:FormData) => {
        const providedAddress= formData.get('property-address'); 
        
        const fetchData = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${providedAddress}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`);
        const fetchResult = await fetchData.json();

        console.log(fetchResult.results[0].formatted_address);
        console.log(fetchResult.results[0].geometry.location);
   

        
    }

const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || e.target.files.length === 0) {
    toast.error('No image uploaded');
    return;
  }

  if ( e.target.files.length > 6) {
    toast.error('Too many images uploaded. Maximum 6 images.');
    return;
  }

  const promises: Promise<string>[] = [];
  for (const file of Array.from(e.target.files)) {
    if (file.size) {
      promises.push(readFileAsDataURL(file));
    }
  }

  Promise.all(promises)
    .then((dataURLs: string[]) => {
      setImages(dataURLs);
    })
    .catch((error) => {
      console.error('Error reading files:', error);
    });
};

const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result && typeof fileReader.result === 'string') {
        resolve(fileReader.result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    fileReader.onerror = (event) => {
      reject(new Error('Error reading file'));
    };
    fileReader.readAsDataURL(file);
  });
};





  return (
    <div className="min-h-screen w-screen">
        
          <form action={formAction} className="mx-auto p-6 my-8 max-w-6xl bg-darkGray rounded-lg flex flex-col gap-3">
              <p className="text-2xl text-white font-bold">List your Real Estate</p>


<div className="flex w-full flex-wrap gap-3"> 
                  <div className="grid w-full sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      <div className="flex col-span-1 flex-col gap-2">
                        <p className="text-white font-semibold">Propety Name</p>
                        <input name="property-name"  className="p-2 outline-none rounded-lg"/>
                      </div>

                       <div className="flex col-span-1 flex-col gap-2">
                        <p className="text-white font-semibold">Price</p>
                        <input name="property-price" type='number' className="p-2 outline-none rounded-lg"/>
                      </div>

                        <div className="flex flex-col gap-2 col-span-1">
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

                  
</div>

<div className="flex flex-col gap-4">
                  <p className='font-bold text-white text-xl flex gap-2 items-center'><FaCamera size={24} className='text-purple'/> Images</p>
                  <input onChange={handleImages} name="images" type="file" multiple  className="file-input outline-none text-white  bg-purple w-full max-w-xs" accept="image/*" />
                  <div className="flex gap-4 flex-wrap">
                    {images.length > 0 && images.map((item:any, i:any)=>(<Image className='w-16 h-16 rounded-lg object-cover' key={i} width={48} height={48} src={item} alt=''/>))}
                  </div> 
</div>
              

              <div className="flex gap-4 flex-col max-w-2xl w-full">
                  <p className="text-xl text-white font-semibold">Description</p>
                  <textarea className="border-2 outline-none text-white h-36 border-purple p-1 rounded-lg resize-none " name="description"></textarea>
              </div>

<button type="submit" className='self-end max-w-60 w-full text-white text-lg font-semibold bg-purple p-2 rounded-xl'>List your property</button>
          </form>
          
    </div>
  )
}

export default Page