import { Document } from 'mongoose';
import { CreateUserDto } from '../../dtoModels/index.js';

export interface IUserService<T extends Document> {
create(dto: CreateUserDto): Promise<T>;
}
