import { UserDto } from './dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';

@Controller('users')
export class UserController {

    constructor(private readonly _userService: UserService){}

    @Get()
    public async getUsers(): Promise<UserDto[]>{
        return this._userService.getAll();
    }

    @Get('find/:id')
    public async getUser(@Param('id',ParseIntPipe) idUser: number): Promise<UserDto>{
        return this._userService.get(idUser);
    }

    @Post('create')
    public async cretaeUser(@Body() user: User): Promise<UserDto>{
        const createdUser = await this._userService.create(user)
        return createdUser;
    }

    @Put('update/:id')
    public async updateUser(@Param('id',ParseIntPipe) idUser: number, @Body() user: User): Promise<void>{
        const updateUser = await this._userService.update(idUser,user)
        return updateUser;
    }

    @Delete('delete/:id')
    public async deleteUser(@Param('id',ParseIntPipe) idUser: number): Promise<void>{
        const deleteUser = await this._userService.delete(idUser)
        return deleteUser;
    }

}
