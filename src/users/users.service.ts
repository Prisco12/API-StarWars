import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bycript from 'bcrypt'
import { UserInterface } from './interface/user.interface';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserInterface> {
    createUserDto.password = await this.userHash(createUserDto.password)
    const user = new this.userModel(createUserDto);
    return user.save()
  }

  private async userHash(pass) {
    const saltOrRounds = 10
    const hashedPass = await bycript.hash(pass, saltOrRounds)
    return hashedPass
  }

  findAll() {
    return this.userModel.find().exec();
  }

  // findOne(id: string) {
  //   return this.userModel.findById(id)
  // }

  findByName(name: string){
    return this.userModel.findOne({ name: name }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate({_id:id}, {$set: updateUserDto}, {new: true}).exec();
  }

  remove(id: string) {
    return this.userModel.deleteOne({_id: id}).exec();
  }
}