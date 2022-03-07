import { ReadRoleDto } from './dto';
import { Role } from './role.entity';
import { plainToClass } from 'class-transformer';
import { RoleRepository } from './role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusConfig } from '../../../shared/config.status';
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";



@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(RoleRepository) 
        private readonly _roleRepository: RoleRepository,
    ){}

    public async getAll(): Promise<ReadRoleDto[]>{
        const roles: Role[] = await this._roleRepository.find({ where: { status: StatusConfig.ACTIVO} });
        return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
    }

    public async get(id:number): Promise<ReadRoleDto>{
        if(!id) throw new BadRequestException('Id No Enviado Para La Busquda'); 
        const role: Role = await this._roleRepository.findOne(id, { where: { status: StatusConfig.ACTIVO } });
        if(!role) throw new NotFoundException('Role No Encontrado'); 
        return plainToClass(ReadRoleDto,role)
    }

    public async create(role: Role): Promise<ReadRoleDto>{
        const savedRole = await this._roleRepository.save(role);
        return plainToClass(ReadRoleDto,savedRole)
    }

    public async update(id:number, role: Role): Promise<void>{
        await this._roleRepository.update(id,role);
    }

    public async delete(id:number): Promise<void>{
        if(!id) throw new BadRequestException('Id No Enviado Para La Busquda'); 
        const roleExists: Role = await this._roleRepository.findOne(id, { where: { status: StatusConfig.ACTIVO } });
        if(!roleExists) throw new NotFoundException('Role No Encontrado');
        await this._roleRepository.update(id,{ status: StatusConfig.INACTIVO });
    }

} 