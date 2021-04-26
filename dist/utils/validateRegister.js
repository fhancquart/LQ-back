"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateRegister = (options) => {
    if (!options.email.includes('@')) {
        return [{
                field: 'email',
                message: 'Email invalide'
            }];
    }
    if (options.username.length <= 2) {
        return [{
                field: 'username',
                message: 'Username pas assez long'
            }];
    }
    if (options.username.includes('@')) {
        return [{
                field: 'username',
                message: 'Ne peut pas contenir d\'@'
            }];
    }
    if (options.password.length <= 2) {
        return [{
                field: 'password',
                message: 'Mot de passe pas assez long'
            }];
    }
    return null;
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateRegister.js.map