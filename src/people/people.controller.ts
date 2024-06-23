import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpStatus, HttpException } from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    try {
      return this.peopleService.create(createPersonDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Erro ao cadastrar o peoples',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Get('api')
  createApi() {
    return this.peopleService.createApi();
  }

  @Get()
  findAll() {
    return this.peopleService.findAll();
  }

  @Get('id/:id')
  findByID(@Param('id') id: string) {
    return this.peopleService.findByID(id);
  }

  @Get('name')
  findByName(@Body('name') name: string) {
    return this.peopleService.findByName(name);
    }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(id);
  }
}
