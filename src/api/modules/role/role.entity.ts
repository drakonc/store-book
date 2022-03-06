import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('roles')
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @OneToMany(() => User, user => user.role, {nullable: false})
    users: User[];

    @Column({ type: 'varchar', default: 'ACTIVO', length: 8 })
    status: string;

    @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
    updateAt: Date;

}