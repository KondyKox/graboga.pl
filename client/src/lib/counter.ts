// lib/generateUniquePlayerId.ts
import { Db } from 'mongodb';

function generateRandomId(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

export default async function getUniquePlayerId(db: Db) {
    const length = 15;
    let playerId;
    let exists = true;

    while (exists) {
        playerId = generateRandomId(length);
        
        // Check if the generated playerId already exists in the database
        const userExists = await db.collection('users').findOne({ playerId });
        const profileExists = await db.collection('profiles').findOne({ playerId });

        exists = userExists !== null || profileExists !== null; // Check for existence in both collections
    }

    return playerId; // Return a unique playerId
}
