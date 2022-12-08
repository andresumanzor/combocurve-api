import { Service } from 'typedi';

import { Prisma } from '@prisma/client';

import { BaseDatabaseService } from '../_base_database_service.abstract-class';
import { CreateMovieDto } from '../../controllers/movies/dto/create-movie.dto';

@Service()
export class MoviesService extends BaseDatabaseService {
    
    async getAll(
        search?: string,
        skip: number = 0,
        take: number = 10,
    ) {
        const where: Prisma.MovieWhereInput = {};

        if (search) {
            where.OR = {
                name: {
                    startsWith: search,
                    mode: 'insensitive'
                },
            }
        }

        const data = await this.prismaClient.movie.findMany({
            where,
            orderBy: {
                durationInMinutes: 'desc'
            },
            skip: skip,
            take: take,
        });

        const count = await this.prismaClient.movie.count({ where });

        return {
            data,
            count,
        };
    }

    async getById(id: number) {
        return this.prismaClient.movie.findUnique({
            where: { id },
        });
    }

    async createOne(data: CreateMovieDto) {
        const createdMovie = await this.prismaClient.movie.create({ data });
        return this.getById(createdMovie.id);
    }

    async updateOne(id: number, data: CreateMovieDto) {
        return this.prismaClient.movie.update({ where: { id }, data });
    }
}
