import { connectToDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import requestIp from 'request-ip';
import { Collection } from "mongodb";

interface Profile {
    playerId: string;
    inventory: Array<{ item_id: any; category_id: number }>;
  }
  

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

function cardsIds(data: any) {
    let x = '';
    data.map((element: any) => {
        x += element.id + ','
    })
    return x;
}

function addToLogs(user: any, action: any, details: any, status: any, ip: any) {
    const logData = {
        user: user,          // Nazwa użytkownika
        action: action,  // Akcja użytkownika
        details: details, // Szczegóły akcji
        status: status,        // Status akcji
        ip: ip,        // Adres IP użytkownika
    };

    fetch('http://localhost:3000/api/logger/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Ustawienie typu treści
        },
        body: JSON.stringify(logData), // Konwersja danych na JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parsowanie odpowiedzi JSON
        })
        .catch(error => {
            console.error('Error:', error); // Obsługa błędów
        });

}

export async function GET(req: any, { params }: any) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    const ip =  requestIp.getClientIp(req);

    if (!token) {
        return NextResponse.json({ message: 'Authorization token missing' }, { status: 401 });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    const { playerId }: any = decodedToken;

    try {
        const db = await connectToDatabase();
        const packsData = await db.collection('packs').find().toArray();
        const cardsData = await db.collection('cards').find().toArray();
        const profiles: Collection<Profile> = db.collection("profiles");

        let packData = findPackById(packsData, params.id);
        if (packData == null) {
            addToLogs(playerId, 'Pack open', 'Pack not found', 'failed', ip)
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

        const newItems = randomCards.map((card: any) => ({
            item_id: card.id,
            category_id: 1,
            drop_date: new Date()
        }));

        await profiles.updateOne(
            { playerId }, // Znajdź dokument gracza po playerId
            { $push: { inventory: { $each: newItems } } } // Dodaj wszystkie elementy z newItems do inventory
          );

        addToLogs(playerId, 'Pack open', `Pack opened - cards: ${cardsIds(randomCards)}`, 'success', ip)

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

        addToLogs(playerId, 'Pack open', error, 'failed', ip)
        return NextResponse.json({
            status: "error",
            message: "Internal Server Error",
            timestamp: new Date().toISOString(),
        }, { status: 500 });
    }
}

