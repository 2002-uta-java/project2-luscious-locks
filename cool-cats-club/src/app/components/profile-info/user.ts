export interface User{
    id:number;
    username: string;
    muted: boolean;
    banned: boolean;
    moderator: boolean;
    warning: string;
}