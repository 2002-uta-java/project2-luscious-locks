import { Image } from './image';
import { User } from './../profile-info/user';
export interface Rating{
    id?: number;
    rating?: number;
    rater?: User;
    image?: Image;
}