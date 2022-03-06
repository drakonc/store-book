import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserDetails } from './user.details.entity';
import { Role } from '../role/role.entity';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', unique: true, length: 25, nullable: false})
    username: string;

    @Column({type: 'varchar', unique: true, nullable: false})
    email: string;

    @Column({type: 'varchar', nullable: false})
    password: string;

    @OneToOne(() => UserDetails, { cascade:true, nullable: false, eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'detail_id' })
    details: UserDetails;

    @ManyToOne(() => Role, role => role.users, {eager: true})
    role: Role;

    @Column({type: 'varchar', default: 'ACTIVO' ,length: 8})
    status: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
    updatedAt: Date;

}