import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // 
export class AppController {
  constructor(private readonly appService: AppService) {} //aqui estamos diciendo al constructor que va a recibir un servicio, y creamos una instancia del mismo

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
