import { parse } from 'dotenv'
import * as fs from 'fs'

export class ConfigService {

    private readonly envConfig: { [key: string]: string };

    constructor() {
        const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

        if (isDevelopmentEnv) {
            const envFilePath = __dirname + '/../../../.env';
            const existsPath = fs.existsSync(envFilePath);

            if (!existsPath) {
                console.log('el Archivo .env no Existe');
                process.exit(0);
            }

            this.envConfig = parse(fs.readFileSync(envFilePath));
        } else {
            this.envConfig = {
                PORT: process.env.PORT,
                HOST: process.env.HOST,
                PORT_DB: process.env.PORT_DB,
                USERNAME: process.env.USERNAME,
                PASSWORD: process.env.PASSWORD,
                DATABASE: process.env.DATABASE,
                JWT_SECRET: process.env.JWT_SECRET,
            };
        }

    }

    get(key: string): string {
        return this.envConfig[key]
    }

}
