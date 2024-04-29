

import HeroSection from './components/main-page/HeroSection';
import Outstandings from './components/main-page/Outstandings';
import CtaSection from './components/main-page/sections/CtaSection';
import SwipeSlider from './components/main-page/Swiper';

export default function Page() {
  return (
   
    <div className="w-screen min-h-screen overflow-x-hidden">
      <HeroSection />
      <Outstandings/>
      <SwipeSlider />
      <CtaSection/>
</div>

  );
}
