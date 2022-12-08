import { PrismaClient } from '@prisma/client';
import { default as Container } from 'typedi';

export abstract class BaseDatabaseService {
    protected prismaClient: PrismaClient = Container.get('prismaClient');
}
