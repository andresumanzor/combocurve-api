import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class Pagination {
    @IsInt()
    @Min(0)
    @IsPositive()
    @IsOptional()
    skip?: number;

    @IsInt()
    @Min(0)
    @IsPositive()
    @IsOptional()
    take?: number;
}
