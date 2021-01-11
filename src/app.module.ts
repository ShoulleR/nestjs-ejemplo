import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensaje } from 'entities/mensaje.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensajesController } from './mensajes/mensajes.controller';
import { MensajesService } from './mensajes/mensajes.service';

@Module({     //@Module para decirle que la clase que vamos a exportar sera tipo module.
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nest',
      password: '123456',
      database: 'sendmeapp_db',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Mensaje])
  ],  //las imports hace referencia a los componentes,modulos,dependencias,entitys que necesitemos importar
  controllers: [AppController , MensajesController],//todos los controladores que seran parte de este modulo
  providers: [AppService, MensajesService],// los servicios donde se encuentran los metodos de acceso a los datos.
})
export class AppModule {}
