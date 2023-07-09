import { pollsRef } from "$lib/server/db"
import { Auth } from "$lib/server/auth"
import { randomUUID } from "crypto"

export async function POST({ cookies, request }) {
    const formData = await request.json();
    const { newPollName, newPollDescription, newPollImageUrl } = formData;

    const token = cookies.get('token') || false;
    if(token) {
        const auth = await Auth(token);
        if(!auth.error) {
            let uuid = randomUUID();
            await pollsRef.insertOne({ id:uuid, name:newPollName, description:newPollDescription, imageUrl:newPollImageUrl, creator:auth.username, createdAt:new Date().getTime() });
            return new Response(JSON.stringify({ success:true, uuid:uuid }));
        }
    }

    return new Response(JSON.stringify({ success:false }));
};