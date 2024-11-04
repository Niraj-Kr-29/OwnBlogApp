import React from 'react'
import { Link } from 'react-router-dom'

function CategoryCard({title,description,href}) {
    return (
        <>
          <Link to={href || '/'}>
            <div className='w-64 h-52 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-md p-5 hover:bg-gradient-to-br hover:from-neutral-700 hover:to-neutral-800 transition-all ease-in-out duration-500 hover:scale-110'>
                <div className='text-left'>
                    <p className='text-2xl text-left'>{title || "Title"}</p>
                    <p className='text-sm text-left mt-6'>{description || "Description"}</p>
                    <div className='mt-6 text-right'>
                        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"> <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fc4a09_0%,#fc581c_50%,#fa9069_100%)]" /> <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">Read Blogs</span> </button>
                    </div>
                </div>
            </div>
          </Link>
        </>
      )
}

export default CategoryCard