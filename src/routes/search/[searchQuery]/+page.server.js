import { pollsRef, usersRef } from "$lib/server/db";

export async function load({ params }) {
    const searchQuery = new RegExp( params.searchQuery, 'i' );
    var polls = await pollsRef.find({ $or: [{ name:searchQuery }, { description:searchQuery }] }).sort({ date:-1 }).project({ _id:0 }).toArray();
    var users = await usersRef.find({ username:searchQuery }).sort({ date:-1 }).project({ _id:0, signatures:0, password:0, bookmarks:0 }).toArray();
    users = users.map(user => {return {...user, type:'user'}});

    if(polls.length == 0 && users.length == 0) return { query:params.searchQuery, results:false };

    const getUserData = async (poll) => { 
        let user = await usersRef.findOne({ username:poll.creator });
        user = user == null ? null : (({ password, _id, ...o }) => o)(user);
        return { ...poll, user:user, type:"poll" };
    }
    const unresolvedPromises = polls.map(getUserData).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    polls = await Promise.all(unresolvedPromises);

    return { query:params.searchQuery, results:[ ...polls, ...users ] };
};