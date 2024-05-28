const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 5; i++) {
    const zoo = await prisma.zoo.create({
      data: {
        land: faker.address.country(),
        stadt: faker.address.city(),
        adresse: faker.address.streetAddress(),
        baujahr: faker.date.past(50).getFullYear(),
      },
    });

    const abteilungenCount = faker.datatype.number({ min: 2, max: 7 });
    for (let j = 0; j < abteilungenCount; j++) {
      const abteilung = await prisma.abteilung.create({
        data: {
          name: faker.animal.type(),
          zooId: zoo.id,
        },
      });

      const tiereCount = faker.datatype.number({ min: 5, max: 20 });
      for (let k = 0; k < tiereCount; k++) {
        await prisma.tier.create({
          data: {
            name: faker.name.firstName(),
            art: faker.animal.type(),
            abteilungId: abteilung.id,
          },
        });
      }
    }
  }

  for (let i = 0; i < 100; i++) {
    const mitarbeiter = await prisma.mitarbeiter.create({
      data: {
        name: faker.name.firstName(),
      },
    });

    const abteilungen = await prisma.abteilung.findMany();
    const abteilungenCount = faker.datatype.number({ min: 1, max: 4 });
    const abteilungenForMitarbeiter = faker.helpers.arrayElements(abteilungen, abteilungenCount);

    for (const abteilung of abteilungenForMitarbeiter) {
      await prisma.mitarbeiter.update({
        where: { id: mitarbeiter.id },
        data: {
          abteilungen: {
            connect: { id: abteilung.id },
          },
        },
      });
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });