import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { People, PeopleSchema } from './schema/person.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: People.name, schema: PeopleSchema }])],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
