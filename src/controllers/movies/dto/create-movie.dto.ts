import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    ratings: number;

    @IsNumber()
    durationInMinutes: number;
}
