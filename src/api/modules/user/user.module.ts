import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository]),AuthModule],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
