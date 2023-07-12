import { auth } from "$lib/server/Auth"
import { redirect } from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
    const { url, cookies, locals } = event;

    const token = cookies.get('token') || false;
    if(token) {
        const auth = await auth(token);
        if(!auth.error) {
            locals.user = auth;
        } else {
            cookies.delete("token"); 
            throw redirect(303, "/log-in");
        }
    } else {
        locals.user = false;
    }

    if(url.pathname.startsWith("/dashboard") && !locals.user){
        cookies.delete("token"); 
        throw redirect(303, "/log-in");
    }

    return resolve(event);
}