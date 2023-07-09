import { Auth } from "$lib/server/Auth"
import { usersRef, pollsRef } from "$lib/server/db"
import { redirect } from "@sveltejs/kit";

export const actions = {
    save: async ({ cookies, request }) => {
        const formData = Object.fromEntries(await request.formData());
        const { username, email } = formData;

        const token = cookies.get("token") || false;
        if(token){
            const auth = await Auth(token);

            await usersRef.findOneAndUpdate({ username:auth.username }, { $set:{ username:username, email:email } });
            return { success:true };
        }else{
            return { success:false };
        }
    },
    receiveMails: async({ cookies, request }) => {
        const formData = await request.json()
        const { receiveMails } = formData;

        const token = cookies.get("token") || false;
        if(token){
            const auth = await Auth(token);

            await usersRef.findOneAndUpdate({ username:auth.username }, { $set:{ receiveMails:receiveMails } });
            return { success:true };
        }else{
            return { success:false };
        }
    },
    deleteAccount: async ({ cookies }) => {
        const token = cookies.get("token") || false;
        if(token){
            const auth = await Auth(token);

            let userPolls = await pollsRef.find({ creator:auth.username }).toArray()

            for(const poll of userPolls){
                const count = await usersRef.count({ signatures:poll.id });
                await pollsRef.findOneAndUpdate({ id:poll.id }, { $inc:{ signatures:-count } });
                await usersRef.updateMany({  },{ $pull: { signatures: poll.id } });
            }

            await pollsRef.deleteMany({ creator:auth.username })
            await usersRef.deleteOne({ username:auth.username });

            cookies.delete("token");
            throw redirect(303, "/sign-in");
        }else{
            return { success:false };
        }
    }
};