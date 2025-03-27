import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

// how to use dto, services, resolvers,interceptors
// type-graphql,typedi,typeorm,pino,swagger-jsdoc,swagger-ui-express,routing-controllers,class-validator
// jsonwebtoken
// middleware
