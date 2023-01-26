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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./entity/users.entity");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(patientManager, userRepository, jwtService) {
        this.patientManager = patientManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    authenticateUser(username, password) {
        return new Promise(async (resolve, reject) => {
            const user = await this.userRepository.findOne({
                where: { email: username },
            });
            if (user) {
                const isMatch = await bcrypt.compare(password, (await user).password);
                if (isMatch) {
                    const token = this.jwtService.sign({ id: (await user).id });
                    resolve({
                        message: 'success',
                        status: common_1.HttpStatus.OK,
                        token: token,
                    });
                }
                else {
                    reject({
                        message: 'Wrong password!',
                        status: common_1.HttpStatus.BAD_REQUEST,
                        token: null,
                    });
                }
            }
            else {
                reject({
                    message: "Email doesn't exist!",
                    status: common_1.HttpStatus.BAD_REQUEST,
                    token: null,
                });
            }
        });
    }
    async updatePassword(id, newPassword) {
        try {
            const user = await this.getUserById(id);
            if (user) {
                const saltOrRounds = 10;
                const hashedPassword = await bcrypt.hash(newPassword, saltOrRounds);
                const userEn = await this.userRepository.update({
                    id: id,
                }, { password: hashedPassword });
                return user;
            }
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    getUserById(id) {
        try {
            return this.userRepository.findOne({
                where: { id: id },
            });
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)()),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.EntityManager,
        typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map