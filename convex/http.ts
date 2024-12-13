import { httpRouter } from "convex/server";
import {httpAction} from './_generated/server'
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import {api} from './_generated/api'

const http=httpRouter();

http.route({path:'/clerk-webhook',
    method:'POST',
    handler:httpAction(async (ctx , request)=>{
        const webhookSecret=process.env.CLERK_WEBHOOK_SECRET;
        if(!webhookSecret){
            throw new Error('CLERK_WEBHOOK_SECRET is not set');
        }

        const svix_id=request.headers.get('svix-Id');
        const svix_signature=request.headers.get('svix-Signature');
        const svix_timestamp=request.headers.get('svix-Timestamp');

        if(!svix_id || !svix_signature || !svix_timestamp){
            return new Response("Error occurred-- no svix headers",{
                status:400
            })
        }


        const payload=await request.json();
        const body=JSON.stringify(payload)

        const wh=new Webhook(webhookSecret);
        let evt:WebhookEvent;

        try {
            evt=wh.verify(body,{
                "svix-id":svix_id,
                "svix-signature":svix_signature,
                "svix-timestamp":svix_timestamp
            }) as WebhookEvent
            
        } catch (error) {
             console.error("Error verifying webhook:", error);
             return new Response("Error occurred-- failed to verify webhook",{
                status:400
            })
        }

        const eventType=evt.type;
        if(eventType==="user.created"){
            // Handle user created event
            const {id,email_addresses,first_name,last_name}=evt.data

            const email=email_addresses[0].email_address;
            const name= `${first_name || ' '} ${last_name || ' '}`.trim()


            try {
                //save user in database
                await ctx.runMutation(api.users.SyncUser,{
                    userId:id,
                    email,
                    name

                })
                
            } catch (error) {
                console.error("Error saving user in database:", error);
                return new Response("Error occurred-- failed to save user in database",{
                    status:500
                })
                
            }
            
        }
        return new Response('Webhook processed successfully',{
            status:200
        })









    })
})


export default http;