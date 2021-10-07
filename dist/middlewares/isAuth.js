"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuth = ({ context }, next) => {
    const authorization = context.req.headers['authorization'];
    if (!authorization) {
        throw new Error('Oturum açın!');
    }
    try {
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1];
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET);
        context.payload = payload;
    }
    catch (error) {
        console.log(error);
        throw new Error('Oturum açın!');
    }
    return next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map