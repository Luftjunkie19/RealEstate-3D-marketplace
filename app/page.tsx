'use client';

import { useEffect } from 'react';
import HeroSection from './components/main-page/HeroSection';
import Outstandings from './components/main-page/Outstandings';
import CtaSection from './components/main-page/sections/CtaSection';
import SwipeSlider from './components/main-page/Swiper';
import { supabase } from '@/utils/supabase/client';
import { useAuthContext } from '@/utils/hooks/useAuthContext';
import { UserResponse } from '@supabase/supabase-js';

export default function Page() {
  const {dispatch}=useAuthContext();

  useEffect(()=>{
    const getUser = async ()=>{
      await supabase.auth.getUser().then(async (userData:UserResponse)=>{
        console.log(userData.data.user);
  
        if(userData.data.user && dispatch){
          
          const userExists= await supabase.from('users').select('*').eq('id', userData.data.user.id).limit(1);
          
          console.log(userExists);

          if(userExists.data?.length === 0){
            const item = await fetch('/api/insert', {method:"POST", body:JSON.stringify({object:{
              created_at: userData.data.user.created_at,
              email: userData.data.user.email,
              profile_image: userData.data.user.user_metadata.avatar_url ? userData.data.user.user_metadata.avatar_url : null,
              user_name: userData.data.user.user_metadata.user_name ? userData.data.user.user_metadata.user_name : 'Default user'
            }, collection:'users'}), headers:{
              'Content-Type':'application/json'
            } });

            const itemData = await item.json();
            console.log(itemData);
          }
          
          
          dispatch({type:'LOGIN', payload:{user:userData.data.user, session:null}});
        }
      });

    }

    getUser();
  },[]);


  return (

   
    <div className="w-screen min-h-screen overflow-x-hidden">
      <HeroSection />
      <Outstandings/>
      <SwipeSlider />
      <CtaSection/>
</div>

  );
}
