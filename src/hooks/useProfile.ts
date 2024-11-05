import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

interface ProfileData {
    username: string;
    playerId: string;
    displayName: string;
    profilePicture: string;
    ducats: number,
    tickets: number,
    experience: number
}

const useProfile = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<ProfileData | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            setLoading(true);

            const token = localStorage.getItem('token'); // Retrieve token from localStorage

            if (!token) {
                setError('Token is missing. Please log in.');
                setLoading(false);
                return;
            }

            // Verify if the token is valid
            try {
                const decodedToken: any = jwtDecode(token);
                console.log('Decoded Token:', decodedToken);

                // Check expiration date
                if (Date.now() >= decodedToken.exp * 1000) {
                    throw new Error('Token has expired');
                }
            } catch (error) {
                console.error('Token validation failed:', error);
                setError('Invalid or expired token. Please log in again.');
                setLoading(false);
                return;
            }

            // Fetch user profile details from the API
            try {
                const response = await fetch('/api/user/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Session expired or invalid token');
                }

                const userData = await response.json();
                console.log('User Data:', userData);

                // Extract and set user profile data
                setProfile({
                    username: userData[0].username,
                    playerId: userData[0].playerId,
                    displayName: userData[0].displayName,
                    profilePicture: userData[0].profilePicture,
                    ducats: userData[0].currency.ducat,
                    tickets: userData[0].currency.tickets,
                    experience: userData[0].experiencePoints
                });

            } catch (error) {
                console.error('Session check failed:', error);
                setError('Failed to verify session. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    return { loading, error, profile }; // Return loading, error, and profile
};

export default useProfile;
