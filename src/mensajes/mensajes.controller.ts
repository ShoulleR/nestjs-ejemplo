import { HttpStatus, Param, Res } from '@nestjs/common';
import { Controller, Post, Body, Get, Put , Delete} from '@nestjs/common';
import { CreateMensajeDto } from 'dto/create-mensaje-dto';
import { response } from 'express';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {

    constructor(private mensajeServices: MensajesService){

    }

    @Post()
    create(@Body() createMensajeDto: CreateMensajeDto, @Res() response){
         this.mensajeServices.createMensaje(createMensajeDto)
        .then(mensajeOk => response.status(HttpStatus.CREATED).json(mensajeOk))//status 201 que fue creado el 200 es ok
        .catch(()=>{response.status(HttpStatus.FORBIDDEN).json({ok:false,mensaje:'Error en la creación'})})//status 403 Error.
    }

    @Get()
    getAll(@Res() response){
        this.mensajeServices.getAll()
        .then((mensajeDB)=>{
            if(mensajeDB.length<1){response.status(HttpStatus.NOT_FOUND).json({ok:false,mensaje:'No hay registros de mensajes'})}//404 not found
            response.status(HttpStatus.OK).json(mensajeDB)
        })
        .catch()
    }

    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajeDto, @Res() response , @Param('id') id) {
        this.mensajeServices.update(id,updateMensajeDto)
        .then(updated =>{response.status(HttpStatus.OK).json(updated)})
        .catch(()=> response.status(HttpStatus.FORBIDDEN).json({mensaje:'Problemas al actualizar'}))
    }

    @Delete(':id')
    delete(@Res() response,@Param('id') id){
         this.mensajeServices.deleteMensaje(id)
         .then(borrado => response.status(HttpStatus.OK).json({ok:true,mensaje:'mensaje borrado'}))
         .catch(()=>response.status(HttpStatus.FORBIDDEN).json({ok:false,mensaje:'Nada ha sido borrado.'}))
    }
}
