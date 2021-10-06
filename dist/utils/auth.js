"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const createAccessToken = (user) => {
    return (0, jsonwebtoken_1.sign)({ userId: user.id }, accessTokenSecret, { expiresIn: '30min' });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (user) => {
    return (0, jsonwebtoken_1.sign)({ userId: user.id, tokenVersion: user.tokenVersion }, refreshTokenSecret, {
        expiresIn: '2d',
    });
};
exports.createRefreshToken = createRefreshToken;
//# sourceMappingURL=auth.js.map