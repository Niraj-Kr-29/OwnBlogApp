import config from "../config/config";
import { Client,Account,ID } from "appwrite";

export class AuthService{
    client = new Client()
    account

    constructor(){
        this.client
           .setEndpoint(config.appwriteUrl)
           .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)   
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)

            if(userAccount){
                //call another method to make the user login directly
                return this.login({email,password})
            }
            else{
                //we're returning userAccount so that if user is not created then still the app doesn't crash, just an extra safety measure
                return userAccount
            }
        } catch (error) {
            console.log("Appwrite Service :: createAccount::error ", error)
        }
    }

    async login({email,password}){
       try {
        return await this.account.createEmailPasswordSession(email,password)
       } catch (error) {
        console.log("Appwrite Service :: login::error ", error)
       }
    }

    async logout(){
        try {
            await this.account.deleteSession()
        } catch (error) {
            console.log("Appwrite Service :: logout::error ", error)
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser::error ", error)
        }
        return null
    }

}

const authService = new AuthService()

export default authService