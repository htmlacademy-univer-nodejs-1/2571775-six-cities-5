import { injectable } from 'inversify';
import { IUser } from '../../models/index.js';
import { User } from '../../schemas/index.js';
import { IUserService } from './IUserService.js';
import { CreateUserDto } from '../../dtoModels/index.js';
import bcrypt from 'bcrypt';

@injectable()
export class UserService implements IUserService<IUser> {
  private readonly saltRounds = 10;

  async create(dto: CreateUserDto): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(dto.password, this.saltRounds);
    const userToSave = { ...dto, password: hashedPassword };
    const newUser = new User(userToSave);
    return newUser.save();
  }
}
