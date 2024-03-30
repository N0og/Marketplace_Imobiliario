import { 
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    CreateDateColumn,
    JoinColumn
} from "typeorm";
import { Post } from "./Post";

@Entity('tb_images')
export class Images {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "varchar", length: 900, nullable:true})
    filename: string

    @Column({type: "varchar", length: 900, nullable:true})
    path: string

    @Column({type:"int", nullable:false})
    size: number

    @Column({type: "varchar", length: 900, nullable:true})
    type: string

    @Column({type: "varchar", length: 900, nullable:true})
    originalname: string

    @ManyToOne(() => Post, (post) => post.images)
    @JoinColumn({name: "post_id"})
    post: Post

    @CreateDateColumn()
    uploaded_at: Date
}