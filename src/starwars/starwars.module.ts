import { Module } from '@nestjs/common';
import { StarwarsService } from './starwars.service';
import { StarwarsController } from './starwars.controller';

@Module({
  controllers: [StarwarsController],
  providers: [StarwarsService],
})
export class StarwarsModule {}
