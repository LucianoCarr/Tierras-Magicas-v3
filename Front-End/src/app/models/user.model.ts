export class User {
    id!:number; 
    name?:string = "";
    lastName?: string = "";
    email?: string = "";
    birthday?: string = "";
    province?: string = "";
    roleId? : UserRole;
}


export enum UserRole {
    Admin,
    User
}