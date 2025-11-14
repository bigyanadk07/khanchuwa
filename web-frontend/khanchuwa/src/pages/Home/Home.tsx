import React, { useEffect } from 'react'

// Component Imports
import Hero from '../../components/Home/Hero'
import Carousel from '../../components/Home/Carousel'
import Split from '../../components/Home/Split'
import ContactForm from '../../components/Home/ContactForm'

// Type Imports
import type { CarouselItem } from '../../components/Home/Carousel';


// Sample Data
  const featureItems: CarouselItem[] = [
{
      id: "1",
      title: "Explore the Mountains",
      description: "Discover scenic trails and breathtaking views.",
      image: "/images/mountain.jpg",
    },
    {
      id: "2",
      title: "Relax by the Beach",
      description: "Experience tranquility and stunning sunsets.",
      image: "/images/beach.jpg",
    },
    {
      id: "3",
      title: "City Adventures",
      description: "Embrace the vibrant energy of city life.",
      image: "/images/city.jpg",
    },
  ];

const Home:React.FC = () => {
  
    useEffect(()=>{
      window.scrollTo(0,0);
    })
  return (
    <div>
      <Hero/>
      <Carousel
        items={featureItems}
        autoPlay={true}      // optional
        interval={5000}      // optional (milliseconds)
      />
      <Split/>
      <ContactForm/>
    </div>
  )
}

export default Home