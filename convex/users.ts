import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const SyncUser=mutation({
    args:{
        userId:v.string(),
        email:v.string(),
        name:v.string(),
    },
    handler:async (ctx,args)=>{
        const existedUser=await ctx.db.query("users").filter(
            q=>q.eq(q.field("userId"),args.userId)
        ).first();

        if(!existedUser){
            await ctx.db.insert("users",{
                userId:args.userId,
                email:args.email,
                name:args.name,
                isPro:false
            })
        }
    }
})