import { IsNotEmpty } from 'class-validator';
import { Role } from '../../role/role.entity';
import { UserDetails } from '../user.details.entity';

export class UserDto {
    
    @IsNotEmpty()
    id:number;

    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    role: Role;

    @IsNotEmpty()
    details: UserDetails;
}