import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMensajeDto } from 'dto/create-mensaje-dto';
import { Mensaje } from 'entities/mensaje.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MensajesService {
    constructor(
        @InjectRepository(Mensaje)
        private mensajeRepository: Repository<Mensaje>,
      ) {}


      async getAll(): Promise<Mensaje[]> { // Le decimos el tipo de dato que va a devolver cada metodo en este caso una lista tipo Mensaje
            return await this.mensajeRepository.find();
      }

      async createMensaje(mensajeNuevo: CreateMensajeDto): Promise<Mensaje> { //sabemos que del controller vendra un mensaje de tipo CreateMensajeDto{nick: String, mensaje:String}
        let cargaMensaje = new Mensaje();

        cargaMensaje.nick = mensajeNuevo.nick;
        cargaMensaje.mensaje = mensajeNuevo.mensaje;

        return this.mensajeRepository.save(cargaMensaje);


      }

      async update(id:number,mensajeActualizado: CreateMensajeDto): Promise<Mensaje> {
          let actualizaMensaje = await this.mensajeRepository.findOne(id);

          actualizaMensaje.nick = mensajeActualizado.nick;
          actualizaMensaje.mensaje = mensajeActualizado.mensaje

          return await this.mensajeRepository.save(actualizaMensaje); // aqui guardamos de nuevo y como el id ya esta set pues lo actualiza.
          
      }

      async deleteMensaje(id:number): Promise<any>{
        return await this.mensajeRepository.delete(id);
    }


}
