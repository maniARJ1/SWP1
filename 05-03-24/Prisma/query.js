const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class WarenkorbDetails {
    #gesamtPreis;
    #benutzername;

    constructor(obj) {
        this.warenkorbID = obj.WarenkorbID;
        this.#benutzername = obj.benutzer.Benutzername; // Angenommen, es gibt eine Beziehung zu Benutzer
        this.artikel = obj.Artikel.map(a => ({
            name: a.produkt.Name,
            menge: a.Menge,
            preisProStueck: a.produkt.Preis,
            gesamt: a.Menge * a.produkt.Preis
        }));
        this.#gesamtPreis = this.artikel.reduce((acc, artikel) => acc + artikel.gesamt, 0);
    }

    toString() {
        return `${this.#benutzername}'s Warenkorb ID ${this.warenkorbID}: Gesamt ${this.#gesamtPreis.toFixed(2)} ${this.artikel[0]?.produkt.Waehrung || 'EUR'}`;
    }

    get gesamtPreis() {
        return this.#gesamtPreis;
    }
}

async function main() {
    const warenkoerbe = (
        await prisma.warenkorb.findMany({
            include: {
                benutzer: true, // Angenommen, es gibt eine Benutzerrelation im Warenkorb-Modell
                Artikel: {
                    include: {
                        produkt: true
                    }
                }
            },
        })
    )
    .map((obj) => new WarenkorbDetails(obj))
    .sort((a, b) => a.#benutzername.localeCompare(b.#benutzername));
    warenkoerbe.forEach((wk) => console.log(wk.toString()));
    const total = warenkoerbe.reduce((acc, wk) => acc + wk.gesamtPreis, 0);
    console.log(`Gesamtsumme aller Warenkörbe: ${total.toFixed(2)}`);
    prisma.$disconnect();
}

main().catch((e) => {
    console.error(e.message);
});