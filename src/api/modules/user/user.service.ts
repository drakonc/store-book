import { UserDto } from './dto';
import { User } from './user.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';
import { UserRepository } from './user.repository';
import { UserDetails } from './user.details.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MapperService } from '../../../shared/mepper.service';
import { BadRequestException, NotFoundException ,Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository) 
        private readonly _userRepository: UserRepository,
        private readonly _mapperService: MapperService
    ){}

    public async getAll(): Promise<UserDto[]>{
        const users: User[] = await this._userRepository.find({ where: { status: 'ACTIVO' } });
        return this._mapperService.mapCollection<User,UserDto>(users, new UserDto);
    }
    
    public async get(id:number): Promise<UserDto>{
        if(!id) throw new BadRequestException('Id No Enviado Para La Busquda'); 
        const user: User = await this._userRepository.findOne(id, { where: { status: 'ACTIVO' } });
        if(!user) throw new NotFoundException('Usuario No Encontrado'); 
        return this._mapperService.map<User,UserDto>(user, new UserDto());
    }

    public async create(user: User): Promise<UserDto>{
        const details = new UserDetails();
        details.name = "Jose Alfonso";
        details.lastname = "Castro Cantillo";
        user.details = details;

        const repo = await getConnection().getRepository(Role);
        const defaultRole = await repo.findOne({where: {name: 'GENERAL'}});
        user.role = defaultRole;
        const savedUser = await this._userRepository.save(user);
        return this._mapperService.map<User,UserDto>(savedUser, new UserDto());
    }

    public async update(id:number, user: User): Promise<void>{
        await this._userRepository.update(id,user);
    }

    public async delete(id:number): Promise<void>{
        if(!id) throw new BadRequestException('Id No Enviado Para La Busquda'); 
        const userExists: User = await this._userRepository.findOne(id, { where: { status: 'ACTIVO' } });
        if(!userExists) throw new NotFoundException('Usuario No Encontrado');
        await this._userRepository.update(id,{status:'INACTIVO'});
    }
}