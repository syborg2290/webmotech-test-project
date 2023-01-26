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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const exception_filter_1 = require("../helper/exception.filter");
const users_entity_1 = require("./entity/users.entity");
const user_service_1 = require("./user.service");
const sign_user_dto_1 = require("./dto/sign-user.dto");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async signIn(username, password, context) {
        try {
            let result;
            let user = await this.userService.authenticateUser(username, password);
            if (user.token && user.status != common_1.HttpStatus.OK) {
                result = {
                    status: user.status,
                    message: user.message,
                    token: user.token,
                };
            }
            else {
                result = {
                    status: user.status,
                    message: user.message,
                    token: user.token,
                };
            }
            return result;
        }
        catch (error) {
            return error;
        }
    }
    async updatePassword(id, newPassword, context) {
        try {
            let user = await this.userService.updatePassword(id, newPassword);
            return user;
        }
        catch (error) {
            return error;
        }
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => sign_user_dto_1.TokenGetDTO, { name: 'signIn' }),
    (0, common_1.UseFilters)(new exception_filter_1.HttpExceptionFilter()),
    __param(0, (0, graphql_1.Args)('username')),
    __param(1, (0, graphql_1.Args)('password')),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signIn", null);
__decorate([
    (0, graphql_1.Mutation)(() => users_entity_1.Users, { name: 'updatePassword' }),
    (0, common_1.UseFilters)(new exception_filter_1.HttpExceptionFilter()),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('newPassword')),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updatePassword", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => users_entity_1.Users),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map