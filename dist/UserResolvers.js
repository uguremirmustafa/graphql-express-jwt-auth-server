"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserResolver = exports.LoginResponse = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("./entity/User");
const bcryptjs_1 = require("bcryptjs");
const auth_1 = require("./utils/auth");
const isAuth_1 = require("./middlewares/isAuth");
const sendRefreshToken_1 = require("./utils/sendRefreshToken");
const typeorm_1 = require("typeorm");
const validateRegister_1 = require("./utils/validateRegister");
const CredientialsInput_1 = require("./utils/CredientialsInput");
const checkUserType_1 = require("./utils/checkUserType");
const jsonwebtoken_1 = require("jsonwebtoken");
const rateLimit_1 = require("./middlewares/rateLimit");
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let LoginResponse = class LoginResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], LoginResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], LoginResponse.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
LoginResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], LoginResponse);
exports.LoginResponse = LoginResponse;
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let UserResolver = class UserResolver {
    users() {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.User.find({});
        });
    }
    me(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = context.req.headers['authorization'];
            if (!authorization) {
                return null;
            }
            try {
                const token = authorization.split(' ')[1];
                const payload = (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET);
                const user = yield User_1.User.findOne(payload.userId);
                return user;
            }
            catch (error) {
                return null;
            }
        });
    }
    revokeRefreshTokensForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, typeorm_1.getConnection)().getRepository(User_1.User).increment({ id: userId }, 'tokenVersion', 1);
            return true;
        });
    }
    register(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, validateRegister_1.validateRegister)(options);
            if (errors) {
                return { errors };
            }
            const userType = (0, checkUserType_1.checkUserType)(options.email);
            const hashedPassword = yield (0, bcryptjs_1.hash)(options.password, 12);
            let user;
            try {
                const result = yield (0, typeorm_1.getConnection)()
                    .createQueryBuilder()
                    .insert()
                    .into(User_1.User)
                    .values({
                    username: options.username,
                    email: options.email,
                    password: hashedPassword,
                    type: userType,
                })
                    .returning('*')
                    .execute();
                user = result.raw[0];
            }
            catch (error) {
                console.log('here : ', error);
                if (error.detail.includes('already exists') && error.detail.includes('email')) {
                    return {
                        errors: [
                            {
                                field: 'email',
                                message: 'bu email ile kayıtlı başka bir kullanıcı var',
                            },
                        ],
                    };
                }
                if (error.detail.includes('already exists') && error.detail.includes('username')) {
                    return {
                        errors: [
                            {
                                field: 'username',
                                message: 'kullanıcı adı başkası tarafından kullanılıyor',
                            },
                        ],
                    };
                }
            }
            return {
                user,
            };
        });
    }
    login(email, password, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                return {
                    errors: [
                        {
                            field: 'email',
                            message: 'kullanıcı bulunamadı',
                        },
                    ],
                };
            }
            const valid = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!valid) {
                return {
                    errors: [
                        {
                            field: 'password',
                            message: 'kullanıcı veya şifre hatalı',
                        },
                    ],
                };
            }
            (0, sendRefreshToken_1.sendRefreshToken)(res, (0, auth_1.createRefreshToken)(user));
            return {
                accessToken: (0, auth_1.createAccessToken)(user),
                user,
            };
        });
    }
    logout({ res }) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, sendRefreshToken_1.sendRefreshToken)(res, '');
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User], { nullable: true }),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('userId', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "revokeRefreshTokensForUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CredientialsInput_1.CredientialsInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => LoginResponse),
    (0, type_graphql_1.UseMiddleware)((0, rateLimit_1.rateLimit)()),
    __param(0, (0, type_graphql_1.Arg)('email', () => String)),
    __param(1, (0, type_graphql_1.Arg)('password', () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolvers.js.map