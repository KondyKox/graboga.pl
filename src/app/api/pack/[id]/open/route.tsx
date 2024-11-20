import { connectToDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';

function findPackById(packs: any[], packId: any) {
    // Przeszukujemy tablicę paczek, aby znaleźć paczkę z pasującym pack_id
    const pack = packs.find((p: { pack_id: any; }) => p.pack_id === packId);
    return pack ? pack : null; // Zwraca paczkę lub null, jeśli nie znaleziono
}

function getRandomCards(cards: any[], chances: any, numCards: number) {
    // Tworzymy grupy kart według rzadkości
    const rarityGroups = {
        common: cards.filter((card: { rarity: string; }) => card.rarity === 'common'),
        rare: cards.filter((card: { rarity: string; }) => card.rarity === 'rare'),
        epic: cards.filter((card: { rarity: string; }) => card.rarity === 'epic'),
        legendary: cards.filter((card: { rarity: string; }) => card.rarity === 'legendary')
    };

    const totalChance =
        chances.common +
        chances.rare +
        chances.epic +
        chances.legendary;

    // Tablica na wylosowane karty
    const drawnCards: any[] = [];

    // Losowanie numCards kart bez powtórek
    for (let i = 0; i < numCards; i++) {
        let selectedCard: any = null;

        // Losowanie karty, aż znajdziemy kartę do dodania
        while (!selectedCard) {
            const randomChance = Math.random() * totalChance;

            // Losowanie karty na podstawie szans
            if (randomChance < chances.common && rarityGroups.common.length > 0) {
                selectedCard = getRandomCard(rarityGroups.common);
                rarityGroups.common = rarityGroups.common.filter((card: any) => card.id !== selectedCard.id); // Usuwamy wylosowaną kartę
            } else if (randomChance < chances.common + chances.rare && rarityGroups.rare.length > 0) {
                selectedCard = getRandomCard(rarityGroups.rare);
                rarityGroups.rare = rarityGroups.rare.filter((card: any) => card.id !== selectedCard.id); // Usuwamy wylosowaną kartę
            } else if (randomChance < chances.common + chances.rare + chances.epic && rarityGroups.epic.length > 0) {
                selectedCard = getRandomCard(rarityGroups.epic);
                rarityGroups.epic = rarityGroups.epic.filter((card: any) => card.id !== selectedCard.id); // Usuwamy wylosowaną kartę
            } else if (rarityGroups.legendary.length > 0) {
                selectedCard = getRandomCard(rarityGroups.legendary);
                rarityGroups.legendary = rarityGroups.legendary.filter((card: any) => card.id !== selectedCard.id); // Usuwamy wylosowaną kartę
            }

            // Jeśli wylosowaliśmy kartę, kończymy pętlę while
        }

        // Dodajemy kartę do wyników
        drawnCards.push(selectedCard);
    }

    return drawnCards;
}

// Funkcja pomocnicza do losowania karty z grupy
function getRandomCard(cards: any[]): any {
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex];
}

export async function GET(request: any, { params }: any) {
    try {
        const db = await connectToDatabase();
        const packsData = await db.collection('packs').find().toArray();
        const cardsData = await db.collection('cards').find().toArray();

        let packData = findPackById(packsData, params.id);
        if(packData == null) {
            return NextResponse.json({
                status: "error",
                message: "Pack not found",
                timestamp: new Date().toISOString(),
            }, { status: 404 });
        }

        let cards = packData.cards.map(((card: any) => (
            cardsData[card]
        )));

        let randomCards = getRandomCards(cards, packData.chances, 3);

        return NextResponse.json({
            status: "success",
            message: "Pack opened successfully.",
            pack: {
                pack_id: packData.pack_id,
                cards: randomCards,
            },
            transaction_id: "tx_001",
            timestamp: new Date().toISOString(),
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching cards:', error);
        return NextResponse.json({
            status: "error",
            message: "Internal Server Error",
            timestamp: new Date().toISOString(),
        }, { status: 500 });
    }
}

