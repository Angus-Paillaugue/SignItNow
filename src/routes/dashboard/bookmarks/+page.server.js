import { usersRef, pollsRef } from "$lib/server/db"
import { redirect } from "@sveltejs/kit";

export async function load({ locals, cookies }) {
    const { user } = locals;

    if(user){
        let { bookmarks } = user;

        if(bookmarks.length == 0) return { bookmarks:[] };

        const getUserData = async (bookmark) => {
            if(bookmark.type == "user"){
                let user = await usersRef.findOne({ username:bookmark.data });
                user = user == null ? null : (({ password, _id, signatures, bookmarks, receiveMails, ...o }) => o)(user);
                return { ...bookmark, user:user };
            }else{
                let poll = await pollsRef.findOne({ id:bookmark.data });
                poll = poll == null ? null : (({  _id, ...o }) => o)(poll);
                return { ...bookmark, poll:poll };
            }
        }
        const unresolvedPromises = bookmarks.map(getUserData);

        bookmarks = await Promise.all(unresolvedPromises);

        return { bookmarks };
    }else{
        cookies.delete("token");
        throw redirect(303, "/log-in");
    }

};