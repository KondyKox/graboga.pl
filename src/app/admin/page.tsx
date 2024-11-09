"use client";
import { useState, useEffect } from "react";
import LoadingOverlay from "@/components/Loading";
import { FaBan, FaEdit } from "react-icons/fa";
import Tooltip from "@/components/Tooltip";

const AdminPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState([]); // Default to fallback data
    const [activeTab, setActiveTab] = useState("users");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/admin/users");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUsers(data); // Update users state with fetched data
            } catch (err) {
                setError("XD"); // If there's an error, show it
            } finally {
                setLoading(false); // Stop loading when the request finishes
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <LoadingOverlay message="Wczytywanie danych..." />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl mx-auto mt-12">
            {/* Panel boczny nawigacji */}
            <div className="lg:w-1/4 w-full bg-gradient-to-b from-black to-gray-900 text-gold p-6 rounded-xl shadow-xl border-2 border-gold">
                <h2 className="text-xl font-semibold text-gray-300 mb-6 text-center">Panel administracyjny</h2>
                <div className="space-y-4">
                    <button
                        className={`w-full p-3 rounded-lg text-gray-300 hover:text-gold ${activeTab === "users" ? "bg-gray-700" : "bg-gray-800"}`}
                        onClick={() => setActiveTab("users")}
                    >
                        Zarządzanie użytkownikami
                    </button>

                    <button
                        className={`w-full p-3 rounded-lg text-gray-300 hover:text-gold ${activeTab === "logs" ? "bg-gray-700" : "bg-gray-800"}`}
                        onClick={() => setActiveTab("logs")}
                    >
                        Logi systemowe
                    </button>

                    <button
                        className={`w-full p-3 rounded-lg text-gray-300 hover:text-gold ${activeTab === "history" ? "bg-gray-700" : "bg-gray-800"}`}
                        onClick={() => setActiveTab("history")}
                    >
                        Historia działań
                    </button>

                    <button
                        className={`w-full p-3 rounded-lg text-gray-300 hover:text-gold ${activeTab === "stats" ? "bg-gray-700" : "bg-gray-800"}`}
                        onClick={() => setActiveTab("stats")}
                    >
                        Statystyki aplikacji
                    </button>

                    <button
                        className={`w-full p-3 rounded-lg text-gray-300 hover:text-gold ${activeTab === "settings" ? "bg-gray-700" : "bg-gray-800"}`}
                        onClick={() => setActiveTab("settings")}
                    >
                        Ustawienia
                    </button>
                </div>
            </div>

            {/* Główna sekcja */}
            <div className="lg:w-3/4 w-full">
                {/* Zarządzanie użytkownikami */}
                {activeTab === "users" && (
                    <div className="bg-gradient-to-b from-black to-gray-900 text-gold p-8 rounded-xl shadow-xl border-2 border-gold">
                        <h2 className="text-2xl font-semibold text-gray-300 mb-6 text-center">Zarządzanie użytkownikami - {users.length}</h2>
                        <table className="w-full text-gray-300">
                            <thead>
                                <tr>
                                    <th className="p-3 text-left">Player ID</th>
                                    <th className="p-3 text-left">Nazwa Użytkownika</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Role</th>
                                    <th className="p-3 text-left">Akcje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="border-t border-gray-600">
                                        <td className="p-3">{user.playerId}</td>
                                        <td className="p-3">{user.username}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3">{user.role}</td>
                                        <td className="p-3">
                                            {/* Edytuj */}
                                            <button className="text-gray-300 bg-transparent border-2 border-yellow-500 rounded-lg py-2 px-4 hover:bg-yellow-500 hover:text-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
                                                <FaEdit />
                                            </button>
                                            {/* Zablokuj */}
                                            <button className="text-gray-300 bg-transparent border-2 border-red-500 rounded-lg py-2 px-4 hover:bg-red-500 hover:text-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ml-3">
                                                <FaBan />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Other tabs (transactions, logs, etc.) remain as before */}
                {activeTab === "transactions" && (
                    <div className="bg-gradient-to-b from-black to-gray-900 text-gold p-8 rounded-xl shadow-xl border-2 border-gold">
                        <h2 className="text-2xl font-semibold text-gray-300 mb-6">Transakcje</h2>
                        <table className="w-full text-gray-300">
                            <thead>
                                <tr>
                                    <th className="p-3 text-left">Username</th>
                                    <th className="p-3 text-left">Amount</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Transaction data */}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Add more tabs here like logs, history, stats, etc. */}
            </div>
        </div>
    );
};

export default AdminPage;