import { 
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    CreateDateColumn
} from "typeorm";
import { Post } from "./Post";

@Entity('tb_images')
export class Images {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type: "varchar", length: 11, nullable:true})
    url: string

    @ManyToOne(() => Post, (post) => post.images)
    post: Post

    @CreateDateColumn()
    uploaded_at: Date
}