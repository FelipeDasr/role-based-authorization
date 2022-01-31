export interface IUser {
    nickname: string;
    password: string;
    email: string;
    role: string;
}

export interface IUserRecord extends IUser {
    id: string
} 