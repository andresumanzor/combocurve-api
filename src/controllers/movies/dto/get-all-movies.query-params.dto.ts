import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Pagination } from '../../dto/pagination.dto';

export class GetAllEngineersQueryParamsDto extends Pagination {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    search?: string;
}
