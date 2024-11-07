import config from "../config/config";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    databases
    storage

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)   
        this.storage = new Storage(this.client) 
    }

    async createPost({title,slug,content,featuredImage,status,category,userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    category,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite Service::createPost::error ", error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status,category}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    category
                }
            )
        } catch (error) {
            console.log("Appwrite Service::updatePost::error ", error);
        }
    }

    async deletePost(slug){
        try {
           return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service::deletePost::error ", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service::getPost::error ", error);
            return false
        }
    }

    async getAllPosts(queries = [Query.equal("status","active")]){
        try {
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
            return response.documents
        } catch (error) {
            console.log("Appwrite Service::getPosts::error ", error);
            return false
        }
    }

    async getPostsWithCategory(category){
        try {
           const response = await this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            [Query.equal("status","active"),
                Query.equal("category",category)
            ]
           ) 
           return response.documents
        } catch (error) {
            console.log("Appwrite Service::getPostsWithCategory::error ", error);
            return false
        }
    }

    //file upload methods

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service::uploadFile::error ", error);
            return false 
        }
    }

    async deleteFile(fileId){
       try {
         return await this.storage.deleteFile(
            config.appwriteBucketId,
            fileId
         )
       } catch (error) {
            console.log("Appwrite Service::deleteFile::error ", error);
            return false 
       }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
           config.appwriteBucketId,
           fileId
        )
    }

}

const appwriteService = new Service()

export default appwriteService