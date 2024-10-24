import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from 'comp/Loading'; // Import the loading spinner component

const useCheckPermission = (requiredRole: string) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                if (!token) {
                    throw new Error('Authorization token missing');
                }

                const response = await fetch('/api/auth/role', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || 'Failed to fetch user role');
                }

                const { role } = await response.json(); // Assuming your API returns { role: "user" }

                // Check if the user role matches the required role
                if (role !== requiredRole) {
                    router.push('/_not-found'); // Redirect to _not-found if not authorized
                }
            } catch (err) {
                console.error('Error fetching user role:', err);
                setError('Internal Server Error');
                router.push('/_not-found'); // Redirect on error as well
            } finally {
                setLoading(false);
            }
        };

        fetchUserRole();
    }, [requiredRole, router]); // Add requiredRole and router to dependency array

    return { loading, error }; // Return loading and error states
};

export default useCheckPermission;
