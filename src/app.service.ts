import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log("hello desde aqui 123124124124");
    return 'Hello World!';
  }
}
