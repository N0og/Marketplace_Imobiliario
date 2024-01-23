import { 
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    Entity,
    ManyToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Images } from "./Images";
import { User } from "./User";

@Entity('tb_posts')
export class Post {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "varchar", length: 255, nullable:false})
    title: string

    @OneToMany(()=> Images, (images) => images.post)
    images: Images[]

    @Column({type: "varchar", length: 400, nullable:true})
    content: string

    @ManyToOne(() => User, (user) => user.post)
    @JoinColumn({name: "user_id"})
    user: User

    @CreateDateColumn({type:"datetime", nullable:false})
    created_at: Date
}