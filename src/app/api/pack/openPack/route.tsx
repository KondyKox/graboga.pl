import { NextResponse } from 'next/server';

export async function GET(request: any) {
  try {
    
    return NextResponse.json(
        {
            "status": "success",
            "message": "Pack opened successfully.",
            "pack": {
              "pack_id": "001",
              "cards": [
                {
                  "card_id": 27,
                  "name": "Agata Majewska",
                  "rarity": "common",
                  "description": "Dowódca samorządku uczniowskiego",
                  "image": "/cards_img/majewska.jpg"
                },
                {
                  "card_id": 22,
                  "name": "Lucyna Musiał",
                  "rarity": "rare",
                  "description": "Słabe samopoczucie to nie wymówka",
                  "image": "/cards_img/musial.jpg"
                },
                {
                  "card_id": 2,
                  "name": "Boski Mucha",
                  "rarity": "legendary",
                  "description": "Błogosławiony Andrzej Mucha",
                  "image": "/cards_img/mucha_boski.jpg"
                }
              ]
            },
            "transaction_id": "tx_001",
            "timestamp": "2024-11-03T17:00:00Z"
          }
          
     ); // Return formatted services without _id
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
