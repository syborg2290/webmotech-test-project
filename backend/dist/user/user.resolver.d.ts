import { UserService } from './user.service';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    signIn(username: string, password: string, context: any): Promise<any>;
    updatePassword(id: number, newPassword: string, context: any): Promise<any>;
}
