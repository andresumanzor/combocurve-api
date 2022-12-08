import { seedMovies } from './seeds/movies.seed';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    console.log('Seeding database...');
    await seedMovies(prisma);
};

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
