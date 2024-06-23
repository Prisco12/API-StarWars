import { IsNotEmpty, IsString } from "class-validator";


export class CreatePersonDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    height: string;

    @IsString()
    @IsNotEmpty()
    mass: string;

    @IsString()
    @IsNotEmpty()
    hair_color: string;
    
    @IsString()
    @IsNotEmpty()
    skin_color: string;

    @IsString()
    @IsNotEmpty()
    eye_color: string;

    @IsString()
    @IsNotEmpty()
    birth_year: string;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsString({each: true})
    films: string[];


}
