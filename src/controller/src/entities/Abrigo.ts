import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm"

@Entity('abrigos')
export class Abrigos{

    @PrimaryGeneratedColumn()
    id_abrigo:number;

    @Column({type: "text"})
    title_abrigo: string;
    
    @Column("varchar", {length: 40})
    abrigo_type_user: string;

    @Column({type: "text"})
    bairro_abrigo: string;

    @Column({type: "text"})
    rua_abrigo: string;
    
    @Column({type: "text"})
    complemento_abrigo: string;

    @Column("varchar", { length: 15})
    cep_abrigo: string;

    @Column("varchar", { length: 7})
    number_adress_abrigo: number;  
}