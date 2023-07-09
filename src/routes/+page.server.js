import { pollsRef, usersRef } from "$lib/server/db"

export async function load() {
    let polls = await pollsRef.find({  }).limit(10).sort({ date:-1 }).project({ _id:0 }).toArray();

    const getUserData = async (poll) => { 
        let user = await usersRef.findOne({ username:poll.creator });
        user = user == null ? null : (({ password, _id, ...o }) => o)(user);
        return { ...poll, user:user };
    }
    const unresolvedPromises = polls.map(getUserData).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    polls = await Promise.all(unresolvedPromises);

    return { polls };
};