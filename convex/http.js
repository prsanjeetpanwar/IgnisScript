"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("convex/server");
var server_2 = require("./_generated/server");
var svix_1 = require("svix");
var api_1 = require("./_generated/api");
var http = (0, server_1.httpRouter)();
http.route({
    path: '/clerk-webhook',
    method: 'POST',
    handler: (0, server_2.httpAction)(function (ctx, request) { return __awaiter(void 0, void 0, void 0, function () {
        var webhookSecret, svix_id, svix_signature, svix_timestamp, payload, body, wh, evt, eventType, _a, id, email_addresses, first_name, last_name, email, name_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
                    if (!webhookSecret) {
                        throw new Error('CLERK_WEBHOOK_SECRET is not set');
                    }
                    svix_id = request.headers.get('svix-Id');
                    svix_signature = request.headers.get('svix-Signature');
                    svix_timestamp = request.headers.get('svix-Timestamp');
                    if (!svix_id || !svix_signature || !svix_timestamp) {
                        return [2 /*return*/, new Response("Error occurred-- no svix headers", {
                                status: 400
                            })];
                    }
                    return [4 /*yield*/, request.json()];
                case 1:
                    payload = _b.sent();
                    body = JSON.stringify(payload);
                    wh = new svix_1.Webhook(webhookSecret);
                    try {
                        evt = wh.verify(body, {
                            "svix-id": svix_id,
                            "svix-signature": svix_signature,
                            "svix-timestamp": svix_timestamp
                        });
                    }
                    catch (error) {
                        console.error("Error verifying webhook:", error);
                        return [2 /*return*/, new Response("Error occurred-- failed to verify webhook", {
                                status: 400
                            })];
                    }
                    eventType = evt.type;
                    if (!(eventType === "user.created")) return [3 /*break*/, 5];
                    _a = evt.data, id = _a.id, email_addresses = _a.email_addresses, first_name = _a.first_name, last_name = _a.last_name;
                    email = email_addresses[0].email_address;
                    name_1 = "".concat(first_name || ' ', " ").concat(last_name || ' ').trim();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    //save user in database
                    return [4 /*yield*/, ctx.runMutation(api_1.api.users.SyncUser, {
                            userId: id,
                            email: email,
                            name: name_1
                        })];
                case 3:
                    //save user in database
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    console.error("Error saving user in database:", error_1);
                    return [2 /*return*/, new Response("Error occurred-- failed to save user in database", {
                            status: 500
                        })];
                case 5: return [2 /*return*/, new Response('Webhook processed successfully', {
                        status: 200
                    })];
            }
        });
    }); })
});
exports.default = http;