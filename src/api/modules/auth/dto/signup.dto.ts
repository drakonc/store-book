// Datos para registrar en la aplicación 
import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;



}
