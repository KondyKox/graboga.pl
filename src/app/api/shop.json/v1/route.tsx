import { NextResponse } from 'next/server';

export async function GET(request: any) {
   try {

      return NextResponse.json({
         packs: [
            {
               "pack_id": "001",
               "pack_name": "Mixed Rarity Pack 1",
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
            }, {
               "pack_id": "005",
               "pack_name": "Mixed Rarity Pack 2",
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
            }, {
               "pack_id": "005",
               "pack_name": "Mixed Rarity Pack 2",
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
            }, {
               "pack_id": "005",
               "pack_name": "Mixed Rarity Pack 3",
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
            }, {
               "pack_id": "005",
               "pack_name": "Mixed Rarity Pack",
               "pack_img": "/cards_img/korzen_tancerz.jpg",
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
         ],
         subscriptions: [
            {
               "subscription_id": "premium_01",
               "name": "Premium Membership",
               "description": "Zyskaj dostęp do ekskluzywnych paczek, specjalnych kart oraz dodatkowych bonusów co miesiąc.",
               "price": 20.00,
               "currency": "USD",
               "features": [
                 "Dostęp do specjalnych paczek",
                 "Gwarantowana karta rzadkości Epic co miesiąc",
                 "15% zniżki na wszystkie zakupy w sklepie",
                 "Exkluzywne skórki i avatary",
                 "Dostęp do VIP Eventów"
               ],
               "duration": "1 miesiąc",
               "renewal": "automatyczne",
               "is_active": true,
               "next_renewal_date": "2024-12-01T00:00:00Z",
               "status": "active"
             }
         ]
      }
      ); // Return formatted services without _id
   } catch (error) {
      console.error('Error fetching services:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
   }
}
