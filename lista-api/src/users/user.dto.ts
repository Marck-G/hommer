import { IsNotEmpty, IsString, IsStrongPassword , IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword({minLength: 8})
  password: string;

  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  img: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  img: string;
}
