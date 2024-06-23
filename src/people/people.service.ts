import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { readFile } from 'fs/promises';
import { InjectModel } from '@nestjs/mongoose';
import { People } from './schema/person.schema';
import { Model } from 'mongoose';

@Injectable()
export class PeopleService {
  constructor(@InjectModel(People.name) private peopleModel: Model<People>) { }

  create(createPersonDto: CreatePersonDto): Promise<PeopleInterface> {
    return this.peopleModel.create(createPersonDto)
  }


  async createApi() {
    const apiStarWars = JSON.parse(await readFile('StarwarsAPI.json', 'utf-8'))


    const result = Promise.all(apiStarWars.map(async (item) => {
        const people = new this.peopleModel(
          {
            name: item.name,
            height: item.height,
            mass: item.mass,
            hair_color: item.hair_color,
            skin_color: item.skin_color,
            eye_color: item.eye_color,
            birth_year: item.birth_year,
            gender: item.gender,
            films: item.films,
          });
        return people.save();
    }))
    return result
  }

  findByID(id: string): Promise<PeopleInterface> {
    return this.peopleModel.findById(id).exec();
  }

findAll() {
  return this.peopleModel.find().exec();
}

findByName(name: string): Promise<PeopleInterface> {
  return this.peopleModel.findOne({ name: name }).exec();
}

update(id: string, updatePersonDto: UpdatePersonDto) {
  return this.peopleModel.findByIdAndUpdate({_id: id,}, {$set: updatePersonDto}, {new: true}).exec();
}

remove(id: string) {
  return this.peopleModel.deleteOne({_id: id}).exec();
}
}
