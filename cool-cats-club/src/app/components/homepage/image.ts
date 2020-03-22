import { User } from './../profile-info/user';
export interface Image{
    id?: number;
    url?: string;
    accepted?: boolean;
    description?: string;
    poster?: User;
}