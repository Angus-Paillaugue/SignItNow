import { sendEmail } from "$lib/server/sendEmail"
import { usersRef, pollsRef } from "$lib/server/db"

export async function petitionComplete(id){
    const petition = await pollsRef.findOne({ id:id });

    const usersWhoSigned = await usersRef.find({ signatures:id }).toArray();

    for(const user of usersWhoSigned){
        if(user.receiveMails){
            sendEmail({ subject:`${petition.name} has ended!`, text:`The petition you signed named "${petition.name} has gotten all the signatures needed.\nSee for yourself : http://localhost:5173/poll/${petition.id}`, to:user.email })
        }
    }
}