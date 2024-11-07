import React, { useEffect, useState } from 'react'
import { Container,PostCard } from '../components'
import appwriteService from '../appwrite/conf'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../store/postSlice'
import { div } from 'framer-motion/client'

function AllPostsPage() {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts.posts);
    const loading = useSelector((state) => state.posts.loading);
    const error = useSelector((state) => state.posts.error);
    useEffect(()=>{
        dispatch(fetchPosts())
    },[dispatch])

    if (loading) return <div className='h-screen w-full text-3xl text-center mt-40'>Loading posts...</div>;
    if (error) return <div className='h-screen w-full text-3xl text-center mt-40'>Error: {error}</div>;

  return (
    <div className='bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] -z-10 h-screen pt-28 overflow-scroll scroll-smooth no-scrollbar'>
    <div className='w-full py-8 h-screen'>
       <Container>
          <div className='flex flex-wrap justify-center'>
            {posts.map((post)=>(
                <div key={post.$id} className='p-2'>
                    <PostCard {...post} />
                </div>
            ))}
          </div>
       </Container>
    </div>
    </div>
  )
}

export default AllPostsPage