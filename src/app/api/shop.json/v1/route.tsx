import { NextResponse } from 'next/server';

export async function GET(request: any) {
  try {
    
    return NextResponse.json({
        "pack_id": "005",
        "pack_name": "Mixed Rarity Pack",
        "pack_img": "/cards_img/mucha_boski.jpg",
        "pack_description": "Zróżnicowana paczka z kartami różnych rzadkości.",
        "pack_cost": 500,
        "rarity_odds": {
           "common": 40,
           "rare": 30,
           "epic": 15,
           "special": 10,
           "legendary": 5
        },
        "guaranteed_min_rarity": "common",
        "cards": [
           {
              "card_id": 30,
              "card_name": "Urszula Gąsiorowska",
              "card_rarity": "special",
              "card_description": "'Nie nawidzę szczęśliwych ludzi'",
              "card_image_url": "/cards_img/gasiorowska.jpg"
           },
           {
              "card_id": 24,
              "card_name": "Agnieszka Mazurek",
              "card_rarity": "common",
              "card_description": "W czasie lekcji kilkukrotnie powie, że traci cierpliwość",
              "card_image_url": "/cards_img/mazurek.jpg"
           },
           {
              "card_id": 11,
              "card_name": "Paweł Korzeń - Tancerz na rurze",
              "card_rarity": "epic",
              "card_description": "Fenomenalny dyrektor",
              "card_image_url": "/cards_img/korzen_tancerz.jpg"
           }
        ],
        "duplicates": [],
        "transaction_id": "tx_005",
        "timestamp": "2024-11-03T16:49:00Z"
     }
     ); // Return formatted services without _id
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
