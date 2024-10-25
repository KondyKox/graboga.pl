"use client";
import React, { useEffect, useState } from 'react';
import useCheckPermission from 'hooks/useCheckPermission';
import LoadingSpinner from 'comp/Loading';

const Dashboard = () => {
    const requiredRole = 'user'; // Ustal wymagany poziom uprawnień
    const { loading: permissionLoading, error } = useCheckPermission(requiredRole);

    // Stan na przechowywanie statystyk z API
    const [stats, setStats] = useState({ users: 0});
    const [statsLoading, setStatsLoading] = useState(true);

    // Funkcja do pobrania statystyk z API
    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token'); // Pobiera token autoryzacyjny z localStorage
            if (!token) throw new Error('Authorization token missing');

            const response = await fetch('/api/admin/users/count', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Failed to fetch stats');

            const data = await response.json();
            setStats({
                users: data.count || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setStatsLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (permissionLoading || statsLoading) return <LoadingSpinner message="Wczytywanie danych dla administratora..." />;

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Panel administracyjny</h1>
            <div className="dashboard-stats">
                <div className="stat-item">
                    <h2>Użytkownicy</h2>
                    <p>{stats.users}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
