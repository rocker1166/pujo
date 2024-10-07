'use client'

import { ParallaxScroll } from "./ui/parallax-scroll"

const images = [
    {
        name: "image1",
        image: "https://res.cloudinary.com/saas-cloud/image/upload/v1724137551/next-cloudinary-uploads/mipnfffbfdczufq8ejlp.jpg"
    },
    {
        name: "image2",
        image: "https://unsplash.com/photos/tiger-statue-near-green-trees-during-daytime-PWfWtwSwZdQ"
    },
    {
        name: "image3",
        image: "https://res.cloudinary.com/saas-cloud/image/upload/v1724137551/next-cloudinary-uploads/mipnfffbfdczufq8ejlp.jpg"
    },
    {
        name: "image4",
        image: "https://res.cloudinary.com/saas-cloud/image/upload/v1724137551/next-cloudinary-uploads/mipnfffbfdczufq8ejlp.jpg"
    },
    {
        name: "image5",
        image: "https://res.cloudinary.com/saas-cloud/image/upload/v1724137551/next-cloudinary-uploads/mipnfffbfdczufq8ejlp.jpg"
    },
    {
        name: "image6",
        image: "https://res.cloudinary.com/saas-cloud/image/upload/v1724137551/next-cloudinary-uploads/mipnfffbfdczufq8ejlp.jpg"
    },
    {
        name: "image7",
        image: "https://res.cloudinary.com/saas-cloud/image/upload/v1724137551/next-cloudinary-uploads/mipnfffbfdczufq8ejlp.jpg"
    },
    
]
const Section = () => {
    return (
        <div>
            <ParallaxScroll


                imageSection={images} />
        </div>
    )
}

export default Section



