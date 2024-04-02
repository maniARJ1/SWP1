const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { faker } = require('@faker-js/faker');

const maxBenutzer = 3;
const maxProdukte = 10;
const maxWarenkoerbe = 3;
const maxWarenkorbArtikelProWarenkorb = 5;

async function main() {
    // Benutzer erstellen
    for (let i = 0; i < maxBenutzer; i++) {
        const vorname = faker.name.firstName();
        const nachname = faker.name.lastName();
        await prisma.benutzer.create({
            data: {
                Benutzername: faker.internet.userName(vorname, nachname),
                Email: faker.internet.email(vorname, nachname),
                Passwort: faker.internet.password(),
            },
        });
    }
    console.log(`${maxBenutzer} Benutzer wurden erstellt.`);

    // Produkte erstellen
    for (let i = 0; i < maxProdukte; i++) {
        await prisma.produkt.create({
            data: {
                Name: faker.commerce.productName(),
                Preis: parseFloat(faker.commerce.price()),
                Waehrung: "EUR",
                Zutaten: faker.commerce.productMaterial(),
            },
        });
    }
    console.log(`${maxProdukte} Produkte wurden erstellt.`);

    // Warenkörbe und WarenkorbArtikel erstellen
    const benutzerIds = await prisma.benutzer.findMany({ select: { SchulIdNummer: true } });
    const produktNummern = await prisma.produkt.findMany({ select: { ProduktNummer: true } });

    benutzerIds.forEach(async (benutzer) => {
        const warenkorb = await prisma.warenkorb.create({
            data: {
                Artikel: {
                    create: Array.from({ length: maxWarenkorbArtikelProWarenkorb }).map(() => ({
                        ProduktNummer: faker.helpers.arrayElement(produktNummern).ProduktNummer,
                        Menge: faker.datatype.number({ min: 1, max: 5 }),
                    })),
                },
            },
        });
        console.log(`Warenkorb mit ID ${warenkorb.WarenkorbID} wurde erstellt.`);
    });
    
    await prisma.$disconnect();
}

main()
    .then(() => console.log('Seeding abgeschlossen.'))
    .catch((e) => console.error(e.message));