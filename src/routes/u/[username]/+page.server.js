import { usersRef, pollsRef } from "$lib/server/db"

export async function load({ params }) {
    const { username } = params;

    const user = await usersRef.findOne({ username:username });

    let { signatures } = user;

    const getUserData = async (signature) => {
        let poll = await pollsRef.findOne({ id:signature });
        poll = poll == null ? null : (({  _id, ...o }) => o)(poll);
        return { poll:poll };
    }
    const unresolvedPromises = signatures.map(getUserData);

    signatures = await Promise.all(unresolvedPromises);

    return { currentUser:(({  _id, password, bookmarks, ...o }) => o)(user), signatures };
};