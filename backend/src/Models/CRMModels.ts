import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID, Min, MinLength } from "class-validator"

export class CreateContactRequest {
    @IsString()
    @IsNotEmpty()
    firstName: string
    @IsString()
    @IsNotEmpty()
    lastName: string
    @IsEmail()
    email: string
    @IsPhoneNumber()
    phoneNumber: string
    @IsString()
    @IsNotEmpty()
    companyName: string
    @IsString()
    @IsNotEmpty()
    jobTitle: string
}

export class GetContactResponse {
    @IsUUID()
    id: string
    @IsEmail()
    email: string
    @IsPhoneNumber()
    phoneNumber: string
    companyName: string
    jobTitle: string
    firstName: string
    lastName: string
    @IsDate()
    createdAt: Date
}

export class UpdateContactRequest {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstName: string
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    lastName: string
    @IsEmail()
    @IsOptional()
    email: string
    @IsPhoneNumber()
    @IsOptional()
    phoneNumber: string
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    companyName: string
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    jobTitle: string
}