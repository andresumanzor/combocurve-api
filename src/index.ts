import 'reflect-metadata';
import Container from 'typedi';
import { PrismaClient } from '@prisma/client';
import { getApp } from './server';
import { logger } from './logger';
import { getClient } from './db-client';

Container.set('prismaClient', getClient());

const NAME = 'combocurve-api';
const PORT = process.env.PORT || '8080'
const env = process.env.NODE_ENV || 'development';

getApp()
    .then((app) =>
        app.listen(PORT, () => {
            logger.info(`${NAME} listening on port ${PORT} in ${env} mode`);
        }),
    )
    .catch((err) => {
        logger.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await (Container.get('prismaClient') as PrismaClient).$disconnect();
    });
