import { pollsRef } from "$lib/server/db"
import { Auth } from "$lib/server/auth"

export async function POST({ cookies, request }) {
    const formData = await request.json();
    const { editName, editDescription, editImageUrl, id, editObjective } = formData;

    const token = cookies.get('token') || false;
    if(token) {
        const auth = await Auth(token);
        if(!auth.error) {
            await pollsRef.findOneAndUpdate({ id:id }, { $set:{ name:editName, description:editDescription, imageUrl:editImageUrl, objective:editObjective } });
            return new Response(JSON.stringify({ success:true }));
        }
    }

    return new Response(JSON.stringify({ success:false }));
};