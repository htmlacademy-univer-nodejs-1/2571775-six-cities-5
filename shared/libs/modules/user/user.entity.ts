import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { UserType } from '../../../enums/user-type.enum.js';
import { User } from '../../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';
import { CreateUserDto } from './dto/create-user.dto.js';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({unique: true, required: true})
  public email!: string;

  @prop({ required: false, default: '' })
  public avatar!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true, default: '' })
  private password?: string;

  @prop({ required: true })
  public type: UserType;

  @prop({ type: () => [String], default: [] })
  public favorites!: string[];

  constructor(userData: CreateUserDto) {
    super();

    this.email = userData.email;
    this.avatar = userData.avatar as string;
    this.name = userData.name;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string): void {
    this.password = createSHA256(password, salt);
  }


  public getPassword(): string {
    return this.password as string;
  }

  public verifyPassword(password: string, salt: string): boolean {
    return this.password === createSHA256(password, salt);
  }
}

export const UserModel = getModelForClass(UserEntity);
