"use client"
import useProfile from '@/hooks/useProfile';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function calculateLevel(points: number | undefined) {
    if(points == undefined)  return {
        level: 0,
        remainingXP: 0,
        xpForNextLevel: 0
    };
    // Konfiguracja poziomów i mnożnika
    const baseXP = 10;    // Liczba punktów potrzebna do osiągnięcia 1 poziomu
    const multiplier = 1.16; // Mnożnik wzrostu punktów potrzebnych na kolejne poziomy

    // Obliczenie poziomu na podstawie punktów
    let level = 0;
    let xpForNextLevel = baseXP;

    while (points >= xpForNextLevel) {
        points -= xpForNextLevel;
        level++;
        xpForNextLevel = Math.floor(baseXP * Math.pow(multiplier, level));
    }

    // Zwracanie obiektu z poziomem, pozostałymi punktami i wymaganymi na kolejny poziom
    return {
        level: level,
        remainingXP: points,
        xpForNextLevel: xpForNextLevel
    };
}

const ProfilePage = () => {
    const { loading, error, profile } = useProfile();

    let { level, remainingXP, xpForNextLevel } = calculateLevel(profile?.experience);
    const xpPercentage = (remainingXP / xpForNextLevel) * 100;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="bg-gradient-to-b from-black to-gray-900 text-gold p-10 rounded-xl shadow-2xl max-w-xl mx-auto mt-12 border border-gold">
            <h2 className="text-3xl font-bold text-center mb-10 text-gold-light">
                Welcome, {profile?.displayName}
            </h2>

            {/* Profil z paskiem postępu i poziomem */}
            <div className="flex justify-center mb-12 relative">
                <div className="relative w-32 h-32 rounded-full border-4 border-gold shadow-lg">
                    <CircularProgressbar
                        value={xpPercentage}
                        styles={buildStyles({
                            pathColor: "#FFD700",
                            trailColor: "#333",
                            strokeLinecap: "round",
                        })}
                    />
                    <img
                        src={profile?.profilePicture || '/default-profile.png'}
                        alt="Profile Picture"
                        className="w-28 h-28 rounded-full absolute top-1 left-1 shadow-inner border-2 border-black"
                    />
                    
                    {/* Poziom w prawym dolnym rogu awatara */}
                    <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 text-gold font-semibold text-xs rounded-full w-8 h-8 flex items-center justify-center shadow-lg transform translate-x-1/4 translate-y-1/4">
                        {level}
                    </div>
                </div>
            </div>

            {/* Informacje o użytkowniku */}
            <div className="space-y-6">
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-lg border border-gold shadow-md flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-300">
                        Username: <span className="text-gold font-bold">{profile?.username}</span>
                    </p>
                </div>
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-lg border border-gold shadow-md flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-300">
                        Player ID: <span className="text-gold font-bold">{profile?.playerId}</span>
                    </p>
                </div>
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-lg border border-gold shadow-md flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-300">
                        Experience: <span className="text-gold font-bold">{level} LVL</span> 
                        <span className="text-gray-400"> ({remainingXP}/{xpForNextLevel})</span>
                    </p>
                </div>

                {/* Waluty */}
                <div className="flex justify-around mt-10 space-x-4">
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-5 rounded-lg border border-gold shadow-md flex items-center justify-between w-40">
                        <p className="text-lg font-bold text-gold-light">
                            {profile?.ducats}
                        </p>
                        <img src="/boski_dukat.png" alt="Ducats Icon" className="w-6 h-6 ml-2" />
                    </div>

                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-5 rounded-lg border border-gold shadow-md flex items-center justify-between w-40">
                        <p className="text-lg font-bold text-gold-light">
                            {profile?.tickets}
                        </p>
                        <img src="/boski_dukat.png" alt="Tickets Icon" className="w-6 h-6 ml-2" />
                    </div>
                </div>
            </div>
        </div>
    );
    
    
    
    
};

export default ProfilePage;
