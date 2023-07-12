import { pollsRef, usersRef } from "$lib/server/db"
import { error } from "@sveltejs/kit";
import { petitionComplete } from "$lib/utils/petitionComplete.js";

export async function load({ params, locals }) {
    const { id } = params;

    const poll = await pollsRef.findOne({ id:id });
    
    if(poll){
        const creator = await usersRef.findOne({ username:poll.creator });
        if(creator){
            return { poll:(({ _id, ...o }) => o)(poll), creator:(({ _id, password, bookmarks, ...o }) => o)(creator), isCreator:creator.username == locals.user.username };
        }
    }
    
    throw error(404, { message:"Poll not found" });
};

export const actions = {
    default: async ({ cookies, params, locals }) => {
        const { id } = params;
        const token = cookies.get('token') || false;

        if(token) {
            const auth = locals.user
            if(!auth.error) {
                await usersRef.findOneAndUpdate({ username:auth.username }, [{ $set: { signatures: { $cond: [ { $in: [ id, "$signatures" ] }, { $setDifference: [ "$signatures", [ id ] ] }, { $concatArrays: [ "$signatures", [ id ] ] } ] } } }]);
                let isNowSigned = await usersRef.findOne({ username:auth.username });
                isNowSigned = isNowSigned.signatures.includes(id);

                if(isNowSigned){
                    await pollsRef.findOneAndUpdate({ id:id }, { $inc:{ signatures:1 } });
                }else{
                    await pollsRef.findOneAndUpdate({ id:id }, { $inc:{ signatures:-1 } });
                }

                let poll = await pollsRef.findOne({ id:id });

                // Send email to the peoples who signed it
                if(poll.signatures == poll.objective){
                    petitionComplete(id);
                }
                
                return { success:true, isNowSigned, signatures:poll.signatures }
            }
        }
        return { success:false, message:"Ann error occurred while signing this petition!" }
    },
};