import { Auth } from "$lib/server/auth"
import { usersRef } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AUTH_TOKEN_SECRET } from "$env/static/private"

export const load = async ({ cookies, url }) => {
    const token = cookies.get("token") || false;
    if(token){
        const auth = await Auth(token);
        if(!auth.error) {
            if(url.searchParams.get("redirect")){
                throw redirect(303, url.searchParams.get("redirect"));
            }else{
                throw redirect(303, "/dashboard");
            }
        }
    }
};

export const actions = {
    default: async ({ cookies, request, url }) => {
        const formData = Object.fromEntries(await request.formData());
        const { email, username, password } = formData;

        const userExists = await usersRef.findOne({ email:email });
        if(userExists) return { success:false, formData:formData, message:"This email is already in use in another account!" };

        const usernameIsTaken = await usersRef.findOne({ username:username });
        if(usernameIsTaken) return { success:false, formData:formData, message:"This username is already taken!" };

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        await usersRef.insertOne({ username: username, email:email, password:hash, profilePicture:"defaultProfilePicture.png", polls:[], bookmarks:[], receiveMails:true, bio:"No bio for now", banner:"/defaultBanner.jpg" });

        cookies.set("token", generateAccessToken(username), { path:"/" });
        if(url.searchParams.get("redirect")){
            throw redirect(303, url.searchParams.get("redirect"));
        }else{
            throw redirect(301, "/dashboard");
        }
    }
};

function generateAccessToken(username) {return jwt.sign(username, AUTH_TOKEN_SECRET);}