export class User {
    email?: string;
    userHome?: string;
    mainRoles?: string[];
    roles?: string[]
}
export class UserResister {
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
}

export interface ResetPassword {
    password: string;
    confirmPassword: string;
    token: string;
    email: string;
}