import { IsString, IsNumber, IsNotEmpty, Max, IsEmail, Min, MinLength } from 'class-validator';


export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    password: string
    
    @IsNotEmpty()
    @IsNumber()
    @Min(18)
    age: number
    
    @IsNotEmpty()
    @IsEmail()
    email: string
    
    
}

// import { createZodDto } from '@abitia/zod-dto';
// import { z } from 'zod'



// export const createUserSchema =  z.object({
//     name: z.string().nonempty('O nome é obrigatorio'),
//     password: z.string().min(6, 'Minimo de 6 caracteres'),
//     age: z.number({
//         required_error: 'O campo idade é obrigatório',
//         invalid_type_error: 'Caracteres inseridos são invalidos'
//     }).min(18, "Idade minima é de 18 anos").max(100),
//     email: z.string().nonempty('O email é obrigatorio').email('Formato do email é invalido'),
// }).required()

// export class CreateUserDto extends createZodDto(createUserSchema) {}