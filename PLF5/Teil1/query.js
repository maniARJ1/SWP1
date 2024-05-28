// query.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const zoos = await prisma.zoo.findMany();
  console.log('Alle Zoos:');
  zoos.forEach(zoo => console.log(zoo.id, zoo.land, zoo.stadt));

  const zooId = 'ID_DES_ZOOS'; 
  const zoo = await prisma.zoo.findUnique({
    where: { id: zooId },
    include: { abteilungen: true },
  });
  console.log('Infos über Zoo:', zoo);

  console.log('Abteilungen des Zoos:');
  zoo.abteilungen.forEach(abteilung => console.log(abteilung.name));

  console.log('Abteilungen und Anzahl der Tiere:');
  for (const abteilung of zoo.abteilungen) {
    const tiereCount = await prisma.tier.count({ where: { abteilungId: abteilung.id } });
    console.log(`${abteilung.name}: ${tiereCount} Tiere`);
  }

  const mitarbeiterInZoo = await prisma.mitarbeiter.findMany({
    where: {
      abteilungen: {
        some: {
          zooId: zooId,
        },
      },
    },
  });
  console.log('Mitarbeiter im Zoo:');
  mitarbeiterInZoo.forEach(mitarbeiter => console.log(mitarbeiter.name));

  console.log('Mitarbeiter und ihre Abteilungen:');
  for (const mitarbeiter of mitarbeiterInZoo) {
    const abteilungen = await prisma.abteilung.findMany({
      where: {
        mitarbeiter: {
          some: {
            id: mitarbeiter.id,
          },
        },
      },
    });
    console.log(`${mitarbeiter.name} arbeitet in:`);
    abteilungen.forEach(abteilung => console.log(abteilung.name));
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