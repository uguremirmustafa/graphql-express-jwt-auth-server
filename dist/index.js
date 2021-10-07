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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const type_graphql_1 = require("type-graphql");
const UserResolvers_1 = require("./UserResolvers");
const typeorm_1 = require("typeorm");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("./entity/User");
const auth_1 = require("./utils/auth");
const sendRefreshToken_1 = require("./utils/sendRefreshToken");
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./utils/constants");
const port = process.env.PORT || 4000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_1.createConnection)();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        credentials: true,
        origin: constants_1.isProd ? process.env.CLIENT_BASE_URL : 'http://localhost:3000',
    }));
    app.use((0, cookie_parser_1.default)());
    app.post('/refresh_token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.anomy;
        console.log(token);
        if (!token) {
            return res.send({ ok: false, accessToken: '' });
        }
        let payload = null;
        try {
            payload = (0, jsonwebtoken_1.verify)(token, process.env.REFRESH_TOKEN_SECRET);
        }
        catch (error) {
            console.log(error);
            return res.send({ ok: false, accessToken: '' });
        }
        const user = yield User_1.User.findOne({ id: payload.userId });
        if (!user) {
            return res.send({ ok: false, accessToken: '' });
        }
        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: '' });
        }
        (0, sendRefreshToken_1.sendRefreshToken)(res, (0, auth_1.createRefreshToken)(user));
        return res.send({ ok: true, accessToken: (0, auth_1.createAccessToken)(user) });
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({ resolvers: [UserResolvers_1.UserResolver] }),
        context: ({ req, res }) => ({ req, res }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(port, () => console.log(`server listening on ${port}`));
}))();
//# sourceMappingURL=index.js.map