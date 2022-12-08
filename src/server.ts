import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import dotenvSafe from 'dotenv-safe';
import compression from 'compression';
import { Container } from 'typedi';
import { PrismaClient } from '@prisma/client';
import swaggerUiExpress from 'swagger-ui-express';
import { getMetadataArgsStorage, RoutingControllersOptions, useContainer, useExpressServer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { httpLogger } from './logger';

dotenvSafe.config();

export async function getApp() {
    useContainer(Container);

    const app = express();
    app.use(httpLogger);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(compression());
    app.use(helmet());

    const routingControllersOptions: RoutingControllersOptions = {
        controllers: [`${__dirname}/controllers/**/*.controller.*`],
        middlewares: [`${__dirname}/middlewares/**/*.middleware.*`],
        cors: true,
        validation: true,
        classTransformer: true,
        defaultErrorHandler: true,
    };

    useExpressServer(app, routingControllersOptions);

    const schemas = validationMetadatasToSchemas({
        refPointerPrefix: '#/components/schemas/',
    });

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
        components: {
            schemas,
        },
        info: {
            description: 'ComboCurve - Api REST',
            title: 'ComboCurve API',
            version: '1.0.0',
        },
    });

    app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

    app.get('/specs', (_, res) => res.json(spec));

    await (Container.get('prismaClient') as PrismaClient).$connect();

    return app;
}
