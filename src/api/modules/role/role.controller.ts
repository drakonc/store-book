import { ReadRoleDto } from './dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

@Controller('roles')
export class RoleController {

    constructor(private readonly _roleService: RoleService){}

    @Get()
    public async getUsers(): Promise<ReadRoleDto[]>{
        return this._roleService.getAll();
    }

    @Get('find/:id')
    public async getUser(@Param('id',ParseIntPipe) idRole: number): Promise<ReadRoleDto>{
        return this._roleService.get(idRole);
    }

    @Post('create')
    public async cretaeUser(@Body() role: Role): Promise<ReadRoleDto>{
        const createdRol = await this._roleService.create(role)
        return createdRol;
    }

    @Put('update/:id')
    public async updateUser(@Param('id',ParseIntPipe) idRole: number, @Body() role: Role): Promise<void>{
        await this._roleService.update(idRole,role)
    }

    @Delete('delete/:id')
    public async deleteUser(@Param('id',ParseIntPipe) idRole: number): Promise<void>{
        await this._roleService.delete(idRole)
    }


}
