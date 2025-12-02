import { IsEmail, IsString, Length } from 'class-validator';
import { LoginValidationMessage } from '../dto/login-message.js';

export class LoginUserDto {
  @IsEmail({}, { message: LoginValidationMessage.email.invalidId })
  public email!: string;

  @IsString({ message: LoginValidationMessage.password.invalidFormat })
  @Length(6, 12, { message: LoginValidationMessage.password.lengthField })
  public password!: string;
}
