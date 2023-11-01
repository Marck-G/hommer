import { Controller, Post, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { JwtAuthGuard } from '../guards/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() { email, password }: CreateUserDto) {
    const token = await this.usersService.login(email, password);
    if (!token) {
      return { message: 'Credenciales incorrectas' };
    }
    return { token };
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user._id, updateUserDto);
  }
}
