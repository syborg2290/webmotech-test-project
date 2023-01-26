import { JwtService } from '@nestjs/jwt';
import { EntityManager, Repository } from 'typeorm';
import { Users } from './entity/users.entity';
export declare class UserService {
    private patientManager;
    private userRepository;
    private jwtService;
    constructor(patientManager: EntityManager, userRepository: Repository<Users>, jwtService: JwtService);
    authenticateUser(username: any, password: any): Promise<any>;
    updatePassword(id: number, newPassword: string): Promise<Users>;
    getUserById(id: number): Promise<Users>;
}
