import { pollsRef, usersRef } from "$lib/server/db";

export async function load({ params }) {
    const searchQuery = new RegExp( params.searchQuery, 'i' );
    var polls = await pollsRef.find({ $or: [{ title:searchQuery }, { description:searchQuery }, { languages:searchQuery }] }).sort({ date:-1 }).project({ _id:0 }).toArray();

    if(polls.length == 0) return { query:params.searchQuery, results:false };

    const getUserData = async (poll) => { 
        let user = await usersRef.findOne({ username:poll.creator });
        user = user == null ? null : (({ password, _id, ...o }) => o)(user);
        return { ...poll, user:user };
    }
    const unresolvedPromises = polls.map(getUserData).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    polls = await Promise.all(unresolvedPromises);

    return { query:params.searchQuery, results:polls };
};