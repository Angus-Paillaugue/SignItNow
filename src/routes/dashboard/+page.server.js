import { pollsRef } from "$lib/server/db"

export async function load({ locals }) {
    const { user } = locals;

    const pollsLength = await pollsRef.count({ creator:user.username });

    return { pollsLength };
};