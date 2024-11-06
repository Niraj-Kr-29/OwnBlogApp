import React, { useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, RTE, Button} from './index'
import appwriteService from '../appwrite/conf';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({post}) {

    const slugTransform = useCallback((value)=>{
       if(value && typeof value === 'string'){
        return value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-");
       }
    },[])

    const { register,handleSubmit,watch,setValue,control,getValues } = useForm({
        defaultValues:{
            title: post?.title || '',
            slug: slugTransform(post?.slug || ''),
            content: post?.content || '',
            status: post?.status || 'active',
            category: post?.category || 'Technology'
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        try {
            if (!userData?.$id) {
                console.error("Error: User ID is not available");
                return; // Stop execution if userData.$id is undefined
            }
            if(post){
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if(file){
                    appwriteService.deleteFile(post.featuredImage)
                }

                const dbPost = await appwriteService.updatePost(post.$id,{
                    ...data,
                    featuredImage: file? file.$id : post.featuredImage
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
            else{
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if(file){
                    const fileId = file.$id
                    data.featuredImage = fileId
                    const dbPost = await appwriteService.createPost({...data,userId: userData.$id})

                    if(dbPost){
                        navigate(`/post/${dbPost.$id}`)
                    }
                }
            }
        } catch (error) {
            throw error
        }
    }

    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name === 'title'){
                setValue('slug',slugTransform(value.title))
                {shouldValidate: true}
            }
        })
        return () => subscription.unsubscribe()
    },[watch,slugTransform,setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap mt-28'>
       <div className='w-2/3 px-2'>
          <Input
              label = "Title :"
              placeholder = "Title"
              className = 'mb-4'
              {...register("title",{required: true})}
          />
          <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label='Content :' name ='content' control={control} defaultValue={getValues('content')} />
       </div>
       <div className='w-1/3 px-2'>
           <Input
             label='Featured Image'
             type = 'file'
             className='mb-4'
             accept='image/png, image/jpg, image/jpeg, image/gif'
             {...register('image',{required: !post})}
           />
           {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Select
                options={["Technology", "Automobile","World Geography","Psychology"]}
                label="Category"
                className="mb-4"
                {...register("category", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
       </div>
    </form>
  )
}

export default PostForm