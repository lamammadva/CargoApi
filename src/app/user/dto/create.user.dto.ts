import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Nationality, UserGender } from "src/shared/enum/user.enum";

export class CreateUserDto{    
    @ApiProperty({ description: 'User\'s email address' })
    @IsEmail()
    @IsOptional()

    email:string


    
    @ApiProperty({ description: 'Password' })
    @IsString()

    password:string

    
    @ApiProperty({ description: 'Repeat Password' })
    @IsString()


    repeatPassword:string

    
    @ApiProperty({ description: 'User\'s first name' })
    @IsOptional()

    @IsString()
    name:string

    @ApiProperty({ description: 'S/V Serial Number' })
    @IsString()
    @IsOptional()

    svSerialNo: string;
    
    @ApiProperty({ description: 'User\'s last name' })
    @IsString()
    @IsOptional()

    lastname:string

    
    @ApiProperty({ description: 'S/V finnish code' })
    @IsString()
    @IsOptional()

    finnishcode:string

    @ApiProperty({ description: 'User\'s phone number',example:'0501001010' })
    @IsPhoneNumber('AZ')
    @IsOptional()

    phone:string

    
    @ApiProperty({enum:UserGender})
    @IsEnum(UserGender)
    @IsOptional()

    gender: UserGender;

    @Type(() => Date)
    @ApiProperty({ description: 'User\'s date of birth', example: 'dd.mm.yyyy' })
    @IsDate()
    @IsOptional()

    birth:Date

    
    @ApiProperty({ description: 'User address' })
    @IsString()
    @IsOptional()

    address:string

    @ApiProperty({ description: 'İstifadəçi razılığı (true/false)',
    example: true})
    @IsBoolean()

    agreement:boolean

    // @ApiProperty({ enum: Precinct })
    // @IsEnum(Precinct)
    // @IsOptional()
    // precinct: Precinct;


    @ApiProperty({enum:Nationality})
    @IsOptional()
    @IsEnum(Nationality)

    nationality: Nationality;

    
}