import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToOne,
} from "typeorm"
import { User } from "./User";

@Entity('posts')
export class Posts{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: "text"})
    message: string;

    @ManyToOne(type => User, user => user.posts)
    @JoinColumn({ name: "user_id"})
    user: User;
    
}