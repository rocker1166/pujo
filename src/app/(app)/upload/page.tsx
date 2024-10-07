import { AnimatedModalDemo } from '@/components/AnimatedButton'
import Clickbutton from '@/components/ClickButton'
import React from 'react'

const uploadVideos = () => {
  return (
    <div>
      <Clickbutton/>
      <AnimatedModalDemo 
      images="https://res.cloudinary.com/saas-cloud/image/upload/v1723529241/samples/animals/reindeer.jpg"
      name='Reindeer'/>
       </div>
  )
}

export default uploadVideos