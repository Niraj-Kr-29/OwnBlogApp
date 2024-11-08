import React from 'react'
import CategoryCard from '../components/CategoryCard';
import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision';
import { useSelector } from 'react-redux';
import HeroImage from '../assets/HeroImage.svg'

function Home() {
    const authStatus = useSelector((state)=>
        state.auth.status
      )
    const categories = [
        {
            title: "Technology",
            description: "Innovations and advancements shaping the digital world.",
            slug: "/posts/technology"
        },
        {
            title: "Automobile",
            description: "Vehicles, engines, and the future of transportation.",
            slug: "/posts/automobile"
        },
        {
            title: "World Geography",
            description: "Explore continents, countries, and natural landscapes.",
            slug: "/posts/world-geography"
        },
        {
            title: "Psychology",
            description: "Understanding human behavior and mental processes.",
            slug: "/posts/psychology"
        }
    ];
    
    
  return (
    <BackgroundBeamsWithCollision>
        <div className='flex items-center flex-col justify-center px-2 md:px-10 pt-40  py-4 w-full h-screen overflow-scroll scroll-smooth no-scrollbar'>
            <div className='flex w-full h-full'>
            <div className='m-6 sm:text-xl md:text-4xl text-lg mb-16 text-center mt-[25rem] sm:mt-0 w-[70%] content-center'>DIVE DEEP INTO THE OCEAN OF KNOWLEDGE ON <span className='bg-gradient-to-r from-customOrange to-yellow-500 bg-clip-text text-transparent'>VARIOUS DOMAINS</span></div>
            <div className='w-[30%] md:pt-0 pt-80'><img src={HeroImage} alt="" className='w-full h-full' /></div>
            </div>
            <div className='flex justify-center'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between gap-10 md:gap-16">
                    {
                        categories.map((category)=>{
                            return <CategoryCard 
                            key={category.slug}
                            title={category.title}
                            description={category.description}
                            href={authStatus ? category.slug : "/login"}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    </BackgroundBeamsWithCollision>
  );
  
}

export default Home