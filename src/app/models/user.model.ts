import { RoleEnum } from "./roleEnum.enum";

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    isDeleted: boolean;
    role : RoleEnum
    
}