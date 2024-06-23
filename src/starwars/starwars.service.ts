import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';


@Injectable()
export class StarwarsService {
  async createApiJson(data: string) {
    try {
      const apiStarWars = await fetch(`https://swapi.dev/api/people/`)
     const aa = await apiStarWars.json()
     const listPeople = []
     listPeople.push(...aa.results)
     let url = aa.next
     do {
      const apiaux = await fetch(url)
      const aux = await apiaux.json()
      listPeople.push(...aux.results)
      url = aux.next
     } while (url);
     
    
      await writeFile('StarwarsAPI.json', JSON.stringify(listPeople, null, 2))
    
      return 'Arquivo Json Criado'
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      throw new HttpException('Erro ao criar arquivo JSON', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
