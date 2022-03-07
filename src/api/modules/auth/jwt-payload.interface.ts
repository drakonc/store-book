import { Role } from "../role/role.entity";

export interface IJwtPayload {
    id: number;
    username: string;
    email: string;
    role: Role;
    iat?: Date;
}