

import HeroSection from './components/main-page/HeroSection';
import Outstandings from './components/main-page/Outstandings';
import SwipeSlider from './components/main-page/Swiper';

export default function Page() {
  return (
   
    <div className="w-screen min-h-screen">
      <HeroSection />
      <Outstandings/>
      <SwipeSlider/>
</div>

  );
}
