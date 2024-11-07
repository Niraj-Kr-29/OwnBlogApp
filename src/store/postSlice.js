import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appwriteService from "../appwrite/conf";
import { useDispatch } from "react-redux";

//Async Thunks to handle API Calls

//Thunk to fetch posts
export const fetchPosts = createAsyncThunk('/fetchPosts',async(_,{getState})=>{
    const {posts} = getState().posts

    //If posts are already loaded then don't make another API call
    if(posts.length > 0) return posts

    const response = await appwriteService.getAllPosts()
    return response
})

//Thunk to fetch single post by ID
export const fetchPostById = createAsyncThunk('/fetchPostById',async(postId,{getState})=>{
    const {posts} = getState().posts

    //Check if the post is already in the Redux store
    const existingPost = posts.find(post => post.$id === postId)
    if(existingPost){
        return existingPost
    }

    //If not, make an API call
    return await appwriteService.getPost(postId)
})

//Create a new post
export const createPostStore = createAsyncThunk('/createPostStore', async(postData)=>{
    const response = await appwriteService.createPost(postData)
    if (response) return response
    throw new Error('Failed to create post')
})

//Update an existing post
export const updatePostStore = createAsyncThunk('/updatePostStore',async({slug,title,content,featuredImage,status})=>{
    const response = await appwriteService.updatePost(slug,{title,content,featuredImage,status})
    if (response) return response
    throw new Error(`Failed to update post with ID ${slug}`)
})

//Delete a post
export const deletePostStore = createAsyncThunk('/deletePostStore', async(postId,{getState})=>{
    const {posts} = getState().posts
    const updatedPosts = posts.filter(post => post.$id !== postId)
    return updatedPosts
})

export const getPostsByCategory = createAsyncThunk('/getPostByCategory', async(category,{getState})=>{
    const { posts } = getState().posts

    if(posts.length > 0){
        const matchedPosts = posts.filter(post => post.category === category)
        return matchedPosts
    }
    else{
        const Posts = await appwriteService.getPostsWithCategory(category)
        return Posts
    }
})

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        matchedPosts: [],
        currentPost: null,
        loading: false,
        error: null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
           //For fetchPosts
           .addCase(fetchPosts.pending, (state)=>{
              state.loading = true;
              state.error = null
           })
           .addCase(fetchPosts.fulfilled,(state,action)=>{
              state.loading = false
              state.posts = action.payload
           })
           .addCase(fetchPosts.rejected,(state,action)=>{
              state.loading = false
              state.error = action.error.message
           })
           //For fetchPostById
           .addCase(fetchPostById.pending, (state)=>{
                state.loading = true;
                state.error = null
            })
            .addCase(fetchPostById.fulfilled,(state,action)=>{
                state.loading = false
                state.currentPost = action.payload
            })
            .addCase(fetchPostById.rejected,(state)=>{
                state.loading = false
                state.error = action.error.message
            })
            //For createPostStore
            .addCase(createPostStore.pending, (state)=>{
                 state.loading = true;
                 state.error = null
             })
             .addCase(createPostStore.fulfilled,(state,action)=>{
                 state.loading = false
                 state.posts.push(action.payload)
             })
             .addCase(createPostStore.rejected,(state)=>{
                 state.loading = false
                 state.error = action.error.message
             })
             //For updatePostStore
            .addCase(updatePostStore.pending, (state)=>{
                 state.loading = true;
                 state.error = null
             })
             .addCase(updatePostStore.fulfilled,(state,action)=>{
                 state.loading = false
                 state.currentPost = action.payload
             })
             .addCase(updatePostStore.rejected,(state)=>{
                 state.loading = false
                 state.error = action.error.message
             })
             //For getPostsByCategory
             .addCase(getPostsByCategory.pending, (state)=>{
                 state.loading = true;
                 state.error = null
             })
             .addCase(getPostsByCategory.fulfilled,(state,action)=>{
                 state.loading = false
                 state.matchedPosts = action.payload
             })
             .addCase(getPostsByCategory.rejected,(state,action)=>{
                 state.loading = false
                 state.error = action.error.message
             })
             //For deletePostStore
             .addCase(deletePostStore.pending, (state)=>{
                 state.loading = true;
                 state.error = null
             })
             .addCase(deletePostStore.fulfilled,(state,action)=>{
                 state.loading = false
                 state.posts = action.payload
             })
             .addCase(deletePostStore.rejected,(state)=>{
                 state.loading = false
                 state.error = action.error.message
             })
    }
})

export default postSlice.reducer