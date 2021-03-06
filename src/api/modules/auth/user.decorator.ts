import { createParamDecorator } from "@nestjs/common";
import { ReadUserDto } from "../user/dto";

export const GetUser = createParamDecorator((key, req): ReadUserDto => key ? req.user[key] : req.user);