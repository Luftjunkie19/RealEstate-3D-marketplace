'use client';

import { useCallback, useEffect } from 'react';
import HeroSection from './components/main-page/HeroSection';
import Outstandings from './components/main-page/Outstandings';
import CtaSection from './components/main-page/sections/CtaSection';
import SwipeSlider from './components/main-page/Swiper';
import { supabase } from '@/utils/supabase/client';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { UserResponse } from '@supabase/supabase-js';
import OfferPlans from './components/main-page/OfferPlans';
import { createCustomerAccount } from '@/utils/square/server';

export default function Page() {
  const {dispatch, user}=useAuthContext();



  const getUser = useCallback(async ()=>{
    await supabase.auth.getUser().then(async (userData:UserResponse)=>{
      console.log(userData.data.user);

      if(userData.data.user && dispatch){
        
        const userExists= await supabase.from('users').select('*').eq('id', userData.data.user.id).limit(1);
        

        if(userExists.data?.length === 0){
          console.log(user);
        const postData=await createCustomerAccount(userData.data.user.email as string, userData.data.user.id);

        await fetch('/api/insert', {method:"POST", body:JSON.stringify({object:{
            created_at: userData.data.user.created_at,
            email: userData.data.user.email,
            user_id: user?.id,
            profile_image: userData.data.user.user_metadata.avatar_url ? userData.data.user.user_metadata.avatar_url : null,
            user_name: userData.data.user.user_metadata.user_name ? userData.data.user.user_metadata.user_name : 'Default user',
            square_customer: postData,
          }, collection:'users'}), headers:{
            'Content-Type':'application/json'
          } });

      
        }
        
        
        dispatch({type:'LOGIN', payload:{user:userData.data.user, session:null}});
      }
    });

  },[dispatch, user]);

  useEffect(()=>{
    getUser();
  },[]);


  return (

   
    <div className="w-screen min-h-screen overflow-x-hidden">
      <HeroSection />
      <Outstandings/>
      <SwipeSlider />
      <CtaSection/>
      <OfferPlans/>
</div>

  );
}
