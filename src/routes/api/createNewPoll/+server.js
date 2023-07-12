import { pollsRef } from "$lib/server/db"
import { randomUUID } from "crypto"

export async function POST({ cookies, request, locals }) {
    const formData = await request.json();
    const { newPollName, newPollDescription, newPollImageUrl, newPollObjective } = formData;

    const token = cookies.get('token') || false;
    if(token) {
        const auth = locals.user
        if(!auth.error) {
            let uuid = randomUUID();
            await pollsRef.insertOne({ id:uuid, name:newPollName, description:newPollDescription, imageUrl:newPollImageUrl, objective:newPollObjective, creator:auth.username, createdAt:new Date().getTime() });
            return new Response(JSON.stringify({ success:true, uuid:uuid }));
        }
    }

    return new Response(JSON.stringify({ success:false }));
};