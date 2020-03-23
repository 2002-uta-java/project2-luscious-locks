import { User } from './../profile-info/user';
export interface Image{
    id?: number;
    url?: string;
    accepted?: boolean;
    flagged?: boolean;
    description?: string;
    poster?: User;
}