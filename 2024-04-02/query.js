const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getWatchlistNamesForUser(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { watchlists: { select: { name: true } } }
  });
  return user ? user.watchlists.map(watchlist => watchlist.name) : [];
}

async function getTracksFromWatchlist(watchlistId) {
  const watchlist = await prisma.watchlist.findUnique({
    where: { id: watchlistId },
    include: { tracks: true }
  });
  return watchlist ? watchlist.tracks : [];
}

async function main() {
  try {
    const userId = 1;
    const watchlistNames = await getWatchlistNamesForUser(userId);
    console.log(`Watchlist-Namen für Benutzer mit der ID ${userId}:`, watchlistNames);

    const watchlistId = 1;
    const tracks = await getTracksFromWatchlist(watchlistId);
    console.log(`Musikstücke aus der Watchlist mit der ID ${watchlistId}:`, tracks);
  } catch (error) {
    console.error('Fehler beim Ausführen der Abfragen:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
