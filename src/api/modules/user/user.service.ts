import { ReadUserDto } from './dto';
import { User } from './user.entity';
import { getConnection } from 'typeorm';
import { genSalt, hash } from 'bcryptjs'
import { Role } from '../role/role.entity';
import { plainToClass } from 'class-transformer';
import { UserRepository } from './user.repository';
import { SignupDto } from '../auth/dto';
import { UserDetails } from './user.details.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusConfig } from '../../../shared/config.status';
import { BadRequestException, NotFoundException ,Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository) 
        private readonly _userRepository: UserRepository,
    ){}

    public async getAll(): Promise<ReadUserDto[]>{
        const users: User[] = await this._userRepository.find({ where: { status: StatusConfig.ACTIVO } });
        return users.map((user: User) => plainToClass(ReadUserDto, user));
    }
    
    public async get(id:number): Promise<ReadUserDto>{
        if(!id) throw new BadRequestException('Id No Enviado Para La Busquda'); 
        const user: User = await this._userRepository.findOne(id, { where: { status: StatusConfig.ACTIVO } });
        if(!user) throw new NotFoundException('Usuario No Encontrado'); 
        return plainToClass(ReadUserDto,user)
    }

    public async create(signupDto: SignupDto): Promise<ReadUserDto>{
        const { username, email, password } = signupDto;
        const user = new User();
        user.username = username;
        user.email = email;

        const details = new UserDetails();
        user.details = details;

        const repo = await getConnection().getRepository(Role);
        const defaultRole = await repo.findOne({where: {name: 'GENERAL'}});
        user.role = defaultRole;

        const salt = await genSalt(10);
        user.password = await hash(password, salt);
        
        const savedUser = await this._userRepository.save(user);
        return plainToClass(ReadUserDto,savedUser)
    }

    public async update(id:number, user: User): Promise<void>{
        await this._userRepository.update(id,user);
    }

    public async delete(id:number): Promise<void>{
        if(!id) throw new BadRequestException('Id No Enviado Para La Busquda'); 
        const userExists: User = await this._userRepository.findOne(id, { where: { status: StatusConfig.ACTIVO } });
        if(!userExists) throw new NotFoundException('Usuario No Encontrado');
        await this._userRepository.update(id,{ status: StatusConfig.INACTIVO});
    }
}