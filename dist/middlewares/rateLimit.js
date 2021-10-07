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
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimit = void 0;
const index_1 = require("../index");
const rateLimit = (limit = 2) => ({ context: { req }, info }, next) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `rate-limit:${info.fieldName}:${req.ip}`;
    const current = yield index_1.redis.incr(key);
    if (current > limit) {
        return {
            errors: [
                {
                    field: 'password',
                    message: '10 saniye icinde birden fazla giris denemesi yapildi, 10 saniye bekleyiniz.',
                },
            ],
        };
    }
    else if (current === 1) {
        yield index_1.redis.expire(key, 10);
    }
    return next();
});
exports.rateLimit = rateLimit;
//# sourceMappingURL=rateLimit.js.map