import {
    Entity, PrimaryGeneratedColumn, Column
} from 'typeorm';

@Entity()
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    nickname: string;

    @Column({ length: 100 })
    email: string;

    @Column({ length: 200 })
    password: string;

    @Column({ length: 10 })
    role: string;
}

export { User }