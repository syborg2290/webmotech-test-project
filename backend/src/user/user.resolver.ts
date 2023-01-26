import { Resolver, Args, Context, Mutation } from '@nestjs/graphql';
import { UseFilters, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from '../helper/exception.filter';
import { Users } from './entity/users.entity';
import { UserService } from './user.service';
import { TokenGetDTO } from './dto/sign-user.dto';

@Resolver(() => Users)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => TokenGetDTO, { name: 'signIn' })
  @UseFilters(new HttpExceptionFilter())
  async signIn(
    @Args('username') username: string,
    @Args('password') password: string,
    @Context() context,
  ) {
    try {
      let result: TokenGetDTO;
      let user: any = await this.userService.authenticateUser(
        username,
        password,
      );
      if (user.token && user.status != HttpStatus.OK) {
        result = {
          status: user.status,
          message: user.message,
          token: user.token,
        };
      } else {
        result = {
          status: user.status,
          message: user.message,
          token: user.token,
        };
      }

      return result;
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Users, { name: 'updatePassword' })
  @UseFilters(new HttpExceptionFilter())
  async updatePassword(
    @Args('id') id: number,
    @Args('newPassword') newPassword: string,
    @Context() context,
  ) {
    try {
      let user: any = await this.userService.updatePassword(id, newPassword);
      return user;
    } catch (error) {
      return error;
    }
  }
}
