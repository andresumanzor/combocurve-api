import { Service } from 'typedi';
import { Body, Get, JsonController, NotFoundError, Param, Post, Put, QueryParams } from 'routing-controllers';

import { MoviesService } from '../../services';
import { GetAllEngineersQueryParamsDto } from './dto/get-all-movies.query-params.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@Service()
@JsonController('/movies')
export class EngineersController {
    constructor(private moviesService: MoviesService) {}

    @Get()
    async fetchAllEngineers(@QueryParams() queryParams: GetAllEngineersQueryParamsDto) {
        const result = await this.moviesService.getAll(
            queryParams.search,
            queryParams.skip,
            queryParams.take,
        );

        const hasMore = result.count > (queryParams.skip || 0) + result.data.length;

        return {
            data: {
                movies: result.data,
            },
            total: result.count,
            more: hasMore,
        };
    }

    @Get('/:id')
    async fetchEngineer(@Param('id') id: number) {
        const data = await this.moviesService.getById(id);
        if (!data) {
            throw new NotFoundError(`Movie with id ${id} not found`);
        }
        return { data };
    }

    @Post()
    async createEngineer(@Body() body: CreateMovieDto) {
        const data = await this.moviesService.createOne(body);
        return { data };
    }

    @Put('/:id')
    async updateEngineer(@Param('id') id: number, @Body() body: CreateMovieDto) {
        const data = await this.moviesService.updateOne(id, body);
        return { data };
    }
}
