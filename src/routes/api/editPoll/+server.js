import { pollsRef } from "$lib/server/db"

export async function POST({ cookies, request, locals }) {
    const formData = await request.json();
    const { editName, editDescription, editImageUrl, id, editObjective } = formData;

    const token = cookies.get('token') || false;
    if(token) {
        const auth = locals.user
        if(!auth.error) {
            await pollsRef.findOneAndUpdate({ id:id }, { $set:{ name:editName, description:editDescription, imageUrl:editImageUrl, objective:editObjective } });
            return new Response(JSON.stringify({ success:true }));
        }
    }

    return new Response(JSON.stringify({ success:false }));
};