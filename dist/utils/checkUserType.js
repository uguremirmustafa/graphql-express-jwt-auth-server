"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserType = void 0;
const checkUserType = (email) => {
    let userType;
    const eduCheck = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+.edu$').test(email);
    const studentCheck = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+.st.edu$').test(email);
    if (!eduCheck) {
        userType = 'regular';
        return userType;
    }
    if (studentCheck) {
        userType = 'student';
        return userType;
    }
    userType = 'lecturer';
    return userType;
};
exports.checkUserType = checkUserType;
//# sourceMappingURL=checkUserType.js.map