import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Ensure the import is correct

const useUserRole = (token: string | null) => {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            // Check if token is available
            if (!token) {
                console.error('No token found'); // Log if no token
                setError('Authorization token missing');
                setLoading(false);
                return;
            }

            // Check if token is valid
            try {
                const decodedToken: any = jwtDecode(token);
                console.log('Decoded Token:', decodedToken); // Log the decoded token

                // Check expiration
                if (Date.now() >= decodedToken.exp * 1000) {
                    setError('Token has expired');
                    setLoading(false);
                    return;
                }
            } catch (e) {
                console.error('Failed to decode token:', e);
                setError('Invalid token format');
                setLoading(false);
                return;
            }

            try {
                // Fetch the user role from the API
                const response = await fetch('/api/auth/role', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                // Handle non-OK responses
                if (!response.ok) {
                    const data = await response.json();
                    setError(data.message || 'Failed to fetch user role');
                    setRole(null);
                } else {
                    // Parse the JSON response and set the role
                    const data = await response.json();
                    setRole(data.role); // Here we are storing the role in state
                }
            } catch (err) {
                console.error('Error fetching user role:', err);
                setError('Internal Server Error');
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, [token]);

    // Returning an object containing only the role if it exists
    return { role: role ? role : null }; // Will return null if role is not set
};

export default useUserRole;
