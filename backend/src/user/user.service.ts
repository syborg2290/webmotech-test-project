import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, UpdateResult } from 'typeorm';
import { Users } from './entity/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectEntityManager() private patientManager: EntityManager,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  authenticateUser(username, password): Promise<any> {
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
            status: HttpStatus.OK,
            token: token,
          });
        } else {
          reject({
            message: 'Wrong password!',
            status: HttpStatus.BAD_REQUEST,
            token: null,
          });
        }
      } else {
        reject({
          message: "Email doesn't exist!",
          status: HttpStatus.BAD_REQUEST,
          token: null,
        });
      }
    });
  }

  async updatePassword(id: number, newPassword: string): Promise<Users> {
    try {
      const user = await this.getUserById(id);

      if (user) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltOrRounds);
        const userEn = await this.userRepository.update(
          {
            id: id,
          },
          { password: hashedPassword },
        );

        return user;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  getUserById(id: number): Promise<Users> {
    try {
      return this.userRepository.findOne({
        where: { id: id },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
