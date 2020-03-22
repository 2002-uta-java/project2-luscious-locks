import { Image } from './image';
import { User } from './../profile-info/user';
export interface Comment{
    id?: number;
    text?: string;
    flagged?: boolean;
    author?: User;
    image?: Image;
}