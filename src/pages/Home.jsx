import React from 'react'
import { Vortex } from '../components/ui/vortex'
import CategoryCard from '../components/CategoryCard';

function Home() {
    const categories = [
        {
            title: "Technology",
            description: "Innovations and advancements shaping the digital world.",
            slug: "/technology"
        },
        {
            title: "Automobile",
            description: "Vehicles, engines, and the future of transportation.",
            slug: "/automobile"
        },
        {
            title: "World Geography",
            description: "Explore continents, countries, and natural landscapes.",
            slug: "/world-geography"
        },
        {
            title: "Psychology",
            description: "Understanding human behavior and mental processes.",
            slug: "/psychology"
        }
    ];
    
    
  return (
    <div className="w-full mx-auto rounded-md  h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        rangeSpeed = {0.7}
        particleCount={80}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full overflow-scroll scroll-smooth no-scrollbar"
      >
        <div className='w-full'>

            <div className='m-6 sm:text-xl md:text-4xl text-lg mb-16 text-center mt-[30rem] sm:mt-0'>DIVE DEEP INTO THE OCEAN OF KNOWLEDGE ON VARIOUS DOMAINS</div>
            <div className='flex justify-center'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between gap-10 md:gap-16">
                    {
                        categories.map((category)=>{
                            return <CategoryCard 
                            key={category.slug}
                            title={category.title}
                            description={category.description}
                            href={category.slug}
                            />
                        })
                    }
                </div>
            </div>
        </div>

      </Vortex>
    </div>
  );
  
}

export default Home