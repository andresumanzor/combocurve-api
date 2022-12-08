import { Container, Service } from 'typedi';
import { Get, InternalServerError, JsonController } from 'routing-controllers';
import { PrismaClient } from '@prisma/client';
import logger from '../logger';

@Service()
@JsonController()
export class RootController {
    private prismaClient: PrismaClient = Container.get('prismaClient');

    @Get()
    async init() {
        try {
            await this.prismaClient.$queryRaw`SELECT 1`;
            return { status: 'Ok!' };
        } catch (err) {
            logger.error(err);
            throw new InternalServerError('Unhealthy');
        }
    }
}
