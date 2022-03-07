import { ReadUserDto } from './dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';

@Controller('users')
export class UserController {

    constructor(private readonly _userService: UserService){}

    @Get()
    public async getUsers(): Promise<ReadUserDto[]>{
        return this._userService.getAll();
    }

    @Get('find/:id')
    public async getUser(@Param('id',ParseIntPipe) idUser: number): Promise<ReadUserDto>{
        return this._userService.get(idUser);
    }

    @Post('create')
    public async cretaeUser(@Body() user: User): Promise<ReadUserDto>{
        const createdUser = await this._userService.create(user)
        return createdUser;
    }

    @Put('update/:id')
    public async updateUser(@Param('id',ParseIntPipe) idUser: number, @Body() user: User): Promise<void>{
        await this._userService.update(idUser,user)
    }

    @Delete('delete/:id')
    public async deleteUser(@Param('id',ParseIntPipe) idUser: number): Promise<void>{
        await this._userService.delete(idUser)
    }

}
