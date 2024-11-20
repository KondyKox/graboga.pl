import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

const useCheckSession = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            const token = localStorage.getItem('token'); // Pobierz token z localStorage

            if (!token) {
                router.push('/login?redirect='+pathname); // Przekieruj do logowania, jeśli token jest brakujący
                return;
            }

            // Sprawdź, czy token jest ważny
            try {
                const decodedToken: any = jwtDecode(token);

                // Sprawdź datę wygaśnięcia
                if (Date.now() >= decodedToken.exp * 1000) {
                    throw new Error('Token has expired');
                }
            } catch (error) {
                console.error('Token validation failed:', error);
                router.push('/login'); // Przekieruj do logowania, jeśli token jest nieważny
                return;
            }

            // Sprawdzenie poprawności tokenu przez API
            try {
                const response = await fetch('/api/auth/role', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Session expired or invalid token');
                }

                const { role } = await response.json(); // Zakładamy, że API zwraca { role: "user" }

            } catch (error) {
                console.error('Session check failed:', error);
                router.push('/login'); // Przekieruj do logowania
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, [router]); // Dodaj router do tablicy zależności

    return { loading, error }; // Zwracaj loading i error
};

export default useCheckSession;
