import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const SyncUser = mutation({
    args: {
        userId: v.string(),
        email: v.string(),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const existedUser = await ctx.db.query("users").filter(
            q => q.eq(q.field("userId"), args.userId)
        ).first();

        if (!existedUser) {
            await ctx.db.insert("users", {
                userId: args.userId,
                email: args.email,
                name: args.name,
                isPro: false
            })
        }
    }
})


export const getUser=query({
    args:{userId:v.string()},
    handler:async(ctx,args)=>{
        if(!args.userId) return null;

        const user=await ctx.db.query("users").withIndex("by_user_id").filter(
            (a)=>a.eq(a.field("userId"),args.userId))
            .first()

            if(!user) return null;
            return user

    }
})