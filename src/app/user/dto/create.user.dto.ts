import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Length, Matches } from "class-validator";
import { Nationality, UserGender, UserRole } from "src/shared/enum/user.enum";

export class CreateUserDto{    
    @ApiProperty({ description: 'User\'s email address' ,default:'leman@gmail.com'})
    @IsEmail()
    @IsOptional()
    @IsNotEmpty({message:"Email address required"})
    email:string


    
    @ApiProperty({ description: 'Password' ,default:'llmmll99'})
    @IsNotEmpty({message:"Password required"})
    @IsString()
    @Length(8,20,{message:"Password must be min 8 symbols"})
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, {
        message: 'Password must have at least 1 letter, 1 number, and be 8 characters or longer.',
      })
    password:string

    
    @ApiProperty({ description: 'Repeat Password' })
    @IsNotEmpty({message:"Repeat password required"})
    @IsString()
    repeatPassword:string

    
    @ApiProperty({ description: 'User\'s first name' })
    @IsNotEmpty({message:"Name required"})
    @IsString()
    name:string


    @ApiProperty({ description: 'S/V Serial Number' })
    @IsString()
    @Length(8,8,{message:"Serial number must be max 8 symbol"})

    @IsNotEmpty({message:"Serial number required"})
    svSerialNo: string;
    
    @ApiProperty({ description: 'User\'s last name' })
    @IsString()
    @IsNotEmpty({message:"Last name required"})
    lastname:string

    
    @ApiProperty({ description: 'S/V finnish code' })
    @IsString()
    @IsNotEmpty({message:"Fin Code required"})
    @Length(7,7,{message:"Fin Code max 7 symbols must be"})
    finnishcode:string

    @ApiProperty({ description: 'User\'s phone number',example:'0501001010' })
    @IsString()
    @IsNotEmpty({message:"Phone number required"})
    phone:string

    
    @ApiProperty({enum:UserGender})
    @IsEnum(UserGender)
    @IsNotEmpty({message:"Gender required"})
    gender: UserGender;

    @Type(() => Date)
    @ApiProperty({ description: 'User\'s date of birth', example: 'dd.mm.yyyy' })
    @IsDate()
    @IsNotEmpty({message:"Birth date required"})
    birth:Date

    
    @ApiProperty({ description: 'User address' })
    @IsString()
    @IsNotEmpty({message:"Adress required"})
    @Length(5,255,{message:"Adress can not be less than 10 characters"})
    address:string

    @ApiProperty({ description: 'User office address' })
    @IsString()
    @IsOptional()
    office:string

    @ApiProperty({ description: 'İstifadəçi razılığı (true/false)',
    example: true})
    @IsBoolean()
    agreement:boolean

    // @ApiProperty({ enum: Precinct })
    // @IsEnum(Precinct)
    // @IsOptional()
    // precinct: Precinct;


    @Type()
    @ApiProperty({default:UserRole.USER})
    @IsEnum(UserRole,{each: true})
    role: UserRole[]




    @ApiProperty({enum:Nationality,default:Nationality.AZERBAIJANI})
    @IsOptional()
    @IsEnum(Nationality)
    nationality: Nationality;

    
}