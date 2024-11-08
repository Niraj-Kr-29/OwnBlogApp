import React,{useState,useEffect} from 'react'
import appwriteService from '../appwrite/conf'
import { Container,PostCard } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsByCategory } from '../store/postSlice'
import { useParams } from 'react-router-dom'

function CategoryPostsPage({category}) {
    const dispatch = useDispatch()
    const posts = useSelector((state)=>state.posts.matchedPosts)
    const loading = useSelector((state)=>state.posts.loading)
    const error = useSelector((state)=>state.posts.error)
    useEffect(()=>{
        dispatch(getPostsByCategory(category))
    },[dispatch,category])

    if (loading) return <div className='h-screen w-full text-2xl text-center mt-40'>Loading {category} posts!</div>;
    if (error) return <div className='h-screen w-full text-2xl text-center mt-40'>Error: {error}</div>;

  return (
    <div className='w-full py-8 h-screen pt-32 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] -z-10 overflow-scroll scroll-smooth no-scrollbar'>
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
  )
}

export default CategoryPostsPage