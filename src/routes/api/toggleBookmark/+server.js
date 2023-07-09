import { usersRef } from "$lib/server/db"

export async function POST({ locals, request }) {
    const { user } = locals;
    const formData = await request.json();

    const { bookmarkData, bookmarkType } = formData;

    if(user.bookmarks.filter(bookmark => bookmark.data == bookmarkData).length >= 1){
        await usersRef.updateOne({ username:user.username }, { $pull: { bookmarks: { data: bookmarkData }} });
    }else{
        await usersRef.updateOne({ username:user.username }, { $push: { bookmarks: { type:bookmarkType, data: bookmarkData }} });
    }
    
    return new Response(JSON.stringify({ success:true }));
};