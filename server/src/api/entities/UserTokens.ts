import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn
} from "typeorm"
import { User } from "./User";


@Entity('auth_user_tokens')
export class UserTokens{
    @PrimaryColumn()
    id: string;

    @Column()
    refresh_token: string

    @Column()
    user_id: string

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column()
    expires_date: Date
    
    @CreateDateColumn({type:"datetime", nullable:false})
    created_at: Date
}