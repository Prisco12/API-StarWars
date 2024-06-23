import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StarwarsService } from './starwars.service';


@Controller('starwars')
export class StarwarsController {
  constructor(private readonly starwarsService: StarwarsService) {}

  @Get(':api')
  create(@Param('api') serie: string) {
    return this.starwarsService.createApiJson(serie);
  }

}
