import { Module } from '@nestjs/common';
import { MapperService } from './mepper.service';


@Module({
    providers: [MapperService],
    exports: [MapperService]
})
export class SharedModule {}
