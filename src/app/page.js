import Image from "next/image";
import Hero from "./components/sections/Hero";
import FeaturedItems from "./components/sections/FeaturedItems";
import WhyChooseUs from "./components/sections/WhyChooseUs";
import Testimonials from "./components/sections/Reviews";
import SpecialOffer from "./components/sections/SpecialOffer";

export default function Home() {
  return (
        <>
      <Hero />
      <FeaturedItems/>
      <WhyChooseUs />
      <Testimonials/>
      <SpecialOffer/>
    </>


  );
}
