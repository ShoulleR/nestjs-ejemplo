import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mensaje {
    @PrimaryGeneratedColumn()
    id: Number;


    @Column()
    nick: String;


    @Column()
    mensaje: String;
}
