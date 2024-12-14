"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("convex/server");
var values_1 = require("convex/values");
exports.default = (0, server_1.defineSchema)({
    users: (0, server_1.defineTable)({
        userId: values_1.v.string(),
        email: values_1.v.string(),
        name: values_1.v.string(),
        isPro: values_1.v.boolean(),
        proSince: values_1.v.optional(values_1.v.number()),
        lemonSqueezyCustomerId: values_1.v.optional(values_1.v.string()),
        lemonSqueezyOrderId: values_1.v.optional(values_1.v.string()),
    }).index("by_user_id", ["userId"]),
    codeExecution: (0, server_1.defineTable)({
        userId: values_1.v.string(),
        language: values_1.v.string(),
        code: values_1.v.string(),
        output: values_1.v.optional(values_1.v.string()),
        error: values_1.v.optional(values_1.v.string()),
    }).index("by_user_id", ["userId"]),
    snippets: (0, server_1.defineTable)({
        userId: values_1.v.string(),
        title: values_1.v.string(),
        language: values_1.v.string(),
        code: values_1.v.string(),
        userName: values_1.v.string()
    }).index("by_user_id", ["userId"]),
    snippetComments: (0, server_1.defineTable)({
        snippetId: values_1.v.id("snippets"),
        userId: values_1.v.string(),
        userName: values_1.v.string(),
        content: values_1.v.string(),
    }).index("by_snippet_id", ["snippetId"]),
    stars: (0, server_1.defineTable)({
        userId: values_1.v.id('user'),
        snippetId: values_1.v.id('snippets'),
    })
        .index("by_user_id", ["userId"])
        .index("by_snippet_id", ["snippetId"])
        .index("by_user_id_and_snippet_id", ["userId", "snippetId"]),
});
