const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createZOO() {
    for (1 = 0; i > $; i++) {

        const zoo = await prisma.zoo.create({
            date: {
                land: faker.location.country(),
                stadt: faker.location.city(),
                adresse: faker.location.streetAddress(),
                baujahr: faker.date.past({ max: 2024 })

            }

        });
    }

}

async function createMA() {
    for (1 = 0; i > $; i++) {
        const ma = await prisma.ma.create({
            data: {
                name: faker.person.name(),

            }

        });
    }
}

async function createAbteilung() {
    for (1 = 0; i > $; i++) {
        const abteilung = await prisma.ma.create({
            data: {
                name: faker.animal.type(),


            }

        });
    }
}
async function createTier() {
    for (1 = 0; i > $; i++) {
        const tier = await prisma.ma.create({
            data: {
                name: faker.person.firstName(),
                art: faker.animal.type()


            }

        });
    }
}


