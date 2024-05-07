# 3AHWII PLF am 30.4.2024

## Thema Datenmodellierung, Seeding und Queries

## Vorbereitung

siehe Teil1

## Aufgaben

### Datenmodell Zoo

Grundsätzlich hat jedes Model eine id, und die ist vom Typ "String", und die id-Felder mit `cuid` anlegen!

- Zoo:
- - land (String)
- - stadt (beide in faker.location), (String)
- - adresse (location.streetAddress),(String)
- - baujahr (date.past), (Int)
- - abteilungen[]

- Abteilung:
- - name: faker.animal.type(), (String)
- - ein Zoo, zu dem sie gehört
- - mitarbeiter[] dieser Abt.
- - tiere[] in dieser Abt.

- Tier
- - name person.firstName() (String)
- - art: Tipp: faker.animal['type'](), (String)
- - abteilung, in der dieses Tier ist

- Mitarbeiter
- - name - gefaked, (String)
- - abteilungen[] in welchen sie/er arbeitet

Erstelle dieses Datenmodell mithilfe von Prisma. Beachte die besprochene Groß-
und Kleinschreibung Deiner Objekte, auch wenn die Angabe Fehler enthält (!).
#####
### Seeden der Datenbank

Erstelle mithilfe des `seed` Kommandos folgende Objekte:

- 5 Zoo's
- Jeder Zoo soll 2 bis 7 Abteilungen haben (Also Tierarten .. Katzen, Affen,
    usw.)
- Jede Abteilung soll 5 bis 20 Tiere haben
- 100 Mitarbeiter, welche jeweils in 1-4 verschiedenen Abteilungen arbeiten.

Jetzt ist Leben in die Zoos geraten!

### Abfragen der Datenbank

Erstelle eine Applikation `query.js` welche bei `npm start` gestarted wird. Sie
möge strukturiert und verständlich Antworten auf folgende Fragen liefern (von
leicht bis schwer):

- Ausgabe der Namen aller Zoos
- Anhand einer Zoo-Id alles Infos über den Zoo ausgeben
- alle Abteilungen des Zoos ausgeben.
- wie oben und zusätzlich: wie viele Tiere in jeder Abteilung
- alle Mitarbeiter in einem bestimmten Zoo ausgeben
- wie oben und zusätzlich: in welchen Abteilungen sie arbeiten

### extra

- für einen bestimmten Mitarbeiter ermitteln
- - wie viele Tiere er betreut
- - den Namen jedes Tieres das er betreut (als Liste).

### Abgabe

- auf Laufwerk `Z:\`
- **absolut _nur_ Notwendiges** abgeben.
- **Insbesondere keine Angabedateien und kein node_modules!**

Gutes Gelingen!
