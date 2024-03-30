import { 
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    Entity,
    ManyToMany,
    ManyToOne,
    JoinColumn,
    OneToOne
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

    @Column({type: "varchar", length: 500, nullable:true})
    desc: string

    @Column({type: "varchar", length: 200, nullable:true})
    street: string

    @Column({type: "varchar", length: 6, nullable:true})
    number: string

    @Column({type: "varchar", length: 100, nullable:false})
    neighbourhood : string

    @Column({type: "varchar", length: 100, nullable:false})
    city: string

    @Column({type: "varchar", length: 100, nullable:false})
    state: string

    @Column({type: "varchar", length: 10, nullable:false})
    postal_code: string

    @Column({type: "int", nullable:false})
    property_value: number

    @Column({type: "int", nullable:true})
    condo_fee: number

    @Column({type: "int", nullable:true})
    property_tax: number

    @Column({type: "int", nullable:true})
    area_property: number

    @Column({type: "int", width: 10, nullable:false})
    qt_bedrooms: number

    @Column({type: "int", width: 10, nullable:false})
    qt_parking_spaces: number

    @Column({type: "int", width: 10, nullable:false})
    qt_living_rooms: number

    @Column({type: "int", width: 10, nullable:false})
    qt_bathrooms: number

    @Column({type: "int", width: 10, nullable:false})
    qt_kitchens: number

    @ManyToOne(() => User, (user) => user.post)
    @JoinColumn({name: "user_id"})
    user: User

    @CreateDateColumn({type:"datetime", nullable:false})
    created_at: Date
}