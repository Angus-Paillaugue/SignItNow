import { pollsRef } from "$lib/server/db"

export async function load({ locals }) {
    const { user } = locals;

    const polls = await pollsRef.find({ creator:user.username }).project({ _id:0 }).toArray();

    return { polls };
};