import { Module } from '@nestjs/common';
import { Configuration } from './config/config.key';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, RoleModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  
  static port: number | string;

  constructor(private readonly _configService: ConfigService){
    AppModule.port = this._configService.get(Configuration.PORT);
  }

}