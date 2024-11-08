"use client"
import LoadingOverlay from '@/components/Loading';
import useProfile from '@/hooks/useProfile';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function calculateLevel(points: number | undefined) {
    if (points == undefined) return {
        level: 0,
        remainingXP: 0,
        xpForNextLevel: 0
    };

    const baseXP = 200;    // Liczba punktów potrzebna do osiągnięcia 1 poziomu
    const multiplier = 1.13; // Mnożnik wzrostu punktów potrzebnych na kolejne poziomy

    let level = 0;
    let xpForNextLevel = baseXP;

    while (points >= xpForNextLevel) {
        points -= xpForNextLevel;
        level++;
        xpForNextLevel = Math.floor(baseXP * Math.pow(multiplier, level));
    }

    return {
        level: level,
        remainingXP: points,
        xpForNextLevel: xpForNextLevel
    };
}

const UserProfilePage = () => {
    const { loading, error, profile } = useProfile();

    let { level, remainingXP, xpForNextLevel } = calculateLevel(profile?.experience);
    const xpPercentage = (remainingXP / xpForNextLevel) * 100;

    if (loading) return <LoadingOverlay message='Wczytywanie danych...' />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl mx-auto mt-12">
            {/* Profil po lewej stronie na dużych ekranach, a na telefonach na górze */}
            <div className="lg:w-2/3 w-full bg-gradient-to-b from-black to-gray-900 text-gold p-10 rounded-xl shadow-2xl border-2 border-gold">
                <div className="flex justify-center mb-12 relative">
                    <div className="relative w-32 h-32 rounded-full border-4 border-black shadow-lg">
                        <CircularProgressbar
                            value={xpPercentage}
                            styles={buildStyles({
                                pathColor: "#ff0000",
                                trailColor: "#000",
                                strokeLinecap: "butt",
                            })}
                        />
                        <img
                            src={profile?.profilePicture || '/default-profile.png'}
                            alt="Profile Picture"
                            className="w-28 h-28 rounded-full absolute top-1 left-1 shadow-inner border-1 border-black"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-4 rounded-lg border-2 border-gray-600 shadow-md bg-gray-800 flex justify-between items-center hover:border-gold transform transition duration-300 hover:scale-105">
                        <p className="text-md font-semibold text-gray-300">
                            Display Name: <span className="text-gold font-bold">{profile?.displayName}</span>
                        </p>
                    </div>
                    <div className="p-4 rounded-lg border-2 border-gray-600 shadow-md bg-gray-800 flex justify-between items-center hover:border-gold transform transition duration-300 hover:scale-105">
                        <p className="text-md font-semibold text-gray-300">
                            Username: <span className="text-gold font-bold">{profile?.username}</span>
                        </p>
                    </div>
                    <div className="p-4 rounded-lg border-2 border-gray-600 shadow-md bg-gray-800 flex justify-between items-center hover:border-gold transform transition duration-300 hover:scale-105">
                        <p className="text-md font-semibold text-gray-300">
                            Player ID: <span className="text-gold font-bold">{profile?.playerId}</span>
                        </p>
                    </div>
                    <div className="p-4 rounded-lg border-2 border-gray-600 shadow-md bg-gray-800 flex justify-between items-center hover:border-gold transform transition duration-300 hover:scale-105">
                        <p className="text-md font-semibold text-gray-300">
                            Experience: <span className="text-gold font-bold">{level} LVL</span>
                            <span className="text-gray-400"> ({remainingXP}/{xpForNextLevel})</span>
                        </p>
                    </div>
                </div>

                {/* Opcje dla użytkownika */}
                <div className="flex justify-center mt-4 space-x-4">
                    <div className="p-4 rounded-lg bg-gray-800 border-2 border-gray-600 shadow-md w-full hover:border-gold transform transition duration-300 hover:scale-105">
                        <button className="text-lg font-bold text-gold-light">Edytuj Profil</button>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-800 border-2 border-gray-600 shadow-md w-full hover:border-gold transform transition duration-300 hover:scale-105">
                        <button className="text-lg font-bold text-gold-light">Zmiana Hasła</button>
                    </div>
                </div>
            </div>

            {/* Opcje w panelu po prawej stronie */}
            <div className="lg:w-1/3 w-full space-y-6">
                <div className="p-4 rounded-lg border-2 border-gray-600 shadow-md bg-gray-800 hover:border-gold transform transition duration-300 hover:scale-105">
                    <p className="text-lg font-semibold text-gray-300">Moje transakcje</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-gray-600 shadow-md bg-gray-800 hover:border-gold transform transition duration-300 hover:scale-105">
                    <p className="text-lg font-semibold text-gray-300">Pomoc</p>
                </div>
                <div className="p-4 rounded-lg border-2 border-gray-600 shadow-md bg-gray-800 hover:border-gold transform transition duration-300 hover:scale-105">
                    <p className="text-lg font-semibold text-gray-300">Ustawienia konta</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
