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
    url: string

    @ManyToOne(() => Post, (post) => post.images)
    @JoinColumn({name: "post_id"})
    post: Post

    @CreateDateColumn()
    uploaded_at: Date
}