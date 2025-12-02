import { IsEnum, IsUrl, IsEmail, IsString, Length } from 'class-validator';
import { UserType } from '../../../../enums/index.js';
import { UserValidationMessage } from '../dto/user-message.js';

export class CreateUserDto {
  @IsEmail({}, { message: UserValidationMessage.email.invalidId })
  public email!: string;

  @IsUrl({}, { message: UserValidationMessage.avatar.invalidUrl })
  public avatar?: string;

  @IsString({ message: UserValidationMessage.name.invalidFormat })
  @Length(1, 15, { message: UserValidationMessage.name.lengthField })
  public name!: string;

  @IsString({ message: UserValidationMessage.password.invalidFormat })
  @Length(6, 12, { message: UserValidationMessage.password.lengthField })
  public password!: string;

  @IsEnum(UserType, { message: UserValidationMessage.type.invalidId })
  public type!: UserType;
}
