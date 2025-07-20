import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import { Unique } from "typeorm";

export class CreateClienteDto {
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  rif: string;

  @IsString()
  empresa: string; 

  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @IsOptional()
  @IsString()
  direccion?: string;
}