"use client"
import useProfile from '@/hooks/useProfile';

const ProfilePage = () => {
    const { loading, error, profile } = useProfile();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Welcome, {profile?.displayName}</h1>
            <p>Username: {profile?.username}</p>
            <p>Player ID: {profile?.playerId}</p>
            <p>Experience: {profile?.experience}</p>
            <p>Ducats: {profile?.ducats}</p>
            <p>Tickets: {profile?.tickets}</p>
            <img src={profile?.profilePicture || '/default-profile.png'} alt="Profile Picture" />
        </div>
    );
};

export default ProfilePage;
