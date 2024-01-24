import { 
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    Entity
} from "typeorm";
import { Post } from "./Post";

@Entity('tb_users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "varchar", length: 255, nullable:false})
    nome: string

    @Column({type: "varchar", length: 11, nullable:true})
    cpf: string

    @Column({type: "varchar", length: 13, nullable:true})
    telefone: string

    @Column({type: "varchar", length: 6, nullable:true})
    creci: string

    @Column({type: "varchar", length: 100, nullable:false})
    email: string

    @Column({type: "varchar", length: 255, nullable:false})
    password: string

    @OneToMany(() => Post, (post) => post.user)
    post: Post[];

    @CreateDateColumn({type:"datetime", nullable:false})
    created_at: Date
}