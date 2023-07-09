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
        try{
            const formData = Object.fromEntries(await request.formData());
            const { username, password } = formData;
            
            const userExists = await usersRef.findOne({ username:username });
            if(!userExists) return { success:false, formData:formData, message:"No account with this username!" };
            const compare = await bcrypt.compare(password, userExists.password);
            if(compare){
                cookies.set("token", generateAccessToken(username), { path:"/", sameSite:"strict" });
                if(url.searchParams.get("redirect")){
                    throw redirect(303, url.searchParams.get("redirect"));
                }else{
                    throw redirect(303, "/dashboard");
                }
            }
            return { success:false, formData:formData, message:"Incorrect password!" };
        }catch(err){
            console.log(err);
        }
    }
};

function generateAccessToken(username) {return jwt.sign(username, AUTH_TOKEN_SECRET);}