import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
} from "typeorm"
import { User } from "./User";

@Entity('posts')
export class Posts{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: "text"})
    message: string;

    @OneToOne(type => User)
    @JoinColumn({ name: "user_id"})
    user: User;
    
}