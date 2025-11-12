import React from 'react'

// Component Imports
import Hero from '../../components/Home/Hero'
import Carousel from '../../components/Home/Carousel'
import Split from '../../components/Home/Split'
import CTA from '../../components/Home/CTA'

const Home:React.FC = () => {
  return (
    <div>
      <Hero/>
      <Carousel/>
      <Split/>
      <CTA/>
    </div>
  )
}

export default Home