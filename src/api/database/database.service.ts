import { ConnectionOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '../config/config.key';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService){
            return {
                type: 'postgres' as 'postgres',
                name: 'default',
                username: config.get(Configuration.USERNAME),
                database: config.get(Configuration.DATABASE),
                host: config.get(Configuration.HOST),
                port: Number(config.get(Configuration.PORT_DB)),
                password: config.get(Configuration.PASSWORD),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}']
            } as ConnectionOptions; 
        },
    }),
];