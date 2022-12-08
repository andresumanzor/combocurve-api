import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

export const getClient = () => {
    const prismaClient = new PrismaClient({
        log: [
            {
                emit: 'event',
                level: 'query',
            },
            {
                emit: 'event',
                level: 'error',
            },
            {
                emit: 'event',
                level: 'info',
            },
            {
                emit: 'event',
                level: 'warn',
            },
        ],
    });

    prismaClient.$on('query', (e) => logger.info(e, 'query'));
    prismaClient.$on('error', (e) => logger.error(e, 'error'));
    prismaClient.$on('info', (e) => logger.info(e, 'info'));
    prismaClient.$on('warn', (e) => logger.warn(e, 'warn'));

    return prismaClient;
};
