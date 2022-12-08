import { faker } from '@faker-js/faker';

import { PrismaClient } from '@prisma/client';

export const seedMovies = async (prisma: PrismaClient) => {
    await prisma.movie.createMany({
        data: [...Array(25)].map(() => ({
            name: faker.name.jobTitle(),
            ratings: faker.datatype.number({ min: 10, max: 100 }),
            durationInMinutes: faker.datatype.number({ min: 10, max: 180 }),
        })),
    });
};
