"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const isStrong = (password) => {
    const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    return re.test(String(password));
};
const isEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
const validateRegister = (options) => {
    if (options.username.length <= 4) {
        return [
            {
                field: 'username',
                message: 'kullanici adi en az 5 karakterden olusmali',
            },
        ];
    }
    if (options.username.includes('@')) {
        return [
            {
                field: 'username',
                message: 'kullanıcı adı @ sembolü içeremez.',
            },
        ];
    }
    if (!isEmail(options.email)) {
        return [
            {
                field: 'email',
                message: 'geçerli bir email değil!',
            },
        ];
    }
    if (!isStrong(options.password)) {
        return [
            {
                field: 'password',
                message: 'Şifre en az 8 karakter olmalı. Minimum 1 büyük, 1 küçük harf ve 1 özel karakter içermeli.',
            },
        ];
    }
    return null;
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateRegister.js.map