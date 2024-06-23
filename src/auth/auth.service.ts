import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bycript from 'bcrypt'
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private  readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(loginDto: LoginDto): Promise<{ access_token: string }>{
    const user = await this.usersService.findByName(loginDto.name);

    const isMath = await bycript.compare(loginDto.password, user.password)

    if (!user || !isMath) {
      throw new NotFoundException('Email ou senha invalidos');
    }
    
    const payload = { sub: user._id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    }; 
  }
}