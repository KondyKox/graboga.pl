import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

function findPackById(packs: any[], packId: any) {
    // Przeszukujemy tablicę paczek, aby znaleźć paczkę z pasującym pack_id
    const pack = packs.find((p: { pack_id: any; }) => p.pack_id === packId);
    return pack ? pack : null; // Zwraca paczkę lub null, jeśli nie znaleziono
}

export async function GET(request: any, { params }: any) {
    try {
        const db = await connectToDatabase();
        const packsData = await db.collection('packs').find().toArray();
        const cardsData = await db.collection('cards').find().toArray();

        const packData = findPackById(packsData, params.id);
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

        return NextResponse.json({
            status: "success",
            response: {
                pack_id: packData.pack_id,
                chances: packData.chances,
                cards: cards
            },
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
