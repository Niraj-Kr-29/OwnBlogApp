import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appwriteService from "../appwrite/conf";
import { build } from "vite";

//Async Thunks to handle API Calls

export const fetchPosts = createAsyncThunk('/fetchPosts',async({getState})=>{
    const {posts} = getState().posts
})

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [Niraj],
        currentPost: null,
        loading: false,
        error: null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
    }
})