import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength, MaxLength, Matches } from "class-validator";

export class CreatePatientDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string;
  
    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(12)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        'La Contraseña debe contener mayúsculas, minúsculas y números ',
    })
    password: string;
  
    @ApiProperty()
    @IsString()
    @MinLength(1)
    fullName: string;
}
