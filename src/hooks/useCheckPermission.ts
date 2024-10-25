import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode as jwtDecode } from 'jwt-decode';
import LoadingOverlay from 'comp/Loading'; // Importuj komponent ładowania

const useCheckPermission = (requiredRole: string) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkPermission = async () => {
            const token = localStorage.getItem('token'); // Pobierz token z localStorage

            if (!token) {
                router.push('/login'); // Przekieruj do logowania, jeśli token jest brakujący
                return;
            }

            // Sprawdź, czy token jest ważny
            try {
                const decodedToken: any = jwtDecode(token);
                console.log('Decoded Token:', decodedToken); // Debug: Loguj zdekodowany token

                // Sprawdź datę wygaśnięcia
                if (Date.now() >= decodedToken.exp * 1000) {
                    throw new Error('Token has expired');
                }
            } catch (error) {
                console.error('Token validation failed:', error);
                router.push('/login'); // Przekieruj do logowania, jeśli token jest nieważny
                return;
            }

            // Sprawdzenie roli użytkownika przez API
            try {
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

                const { role } = await response.json(); // Zakładamy, że API zwraca { role: "user" }
                console.log('User role:', role); // Debug: Loguj rolę użytkownika

                // Sprawdź, czy rola użytkownika odpowiada wymaganej roli
                if (role !== requiredRole) {
                    router.push('/_not-found'); // Przekieruj do _not-found, jeśli nieautoryzowany
                }
            } catch (error) {
                console.error('Permission check failed:', error);
                setError('Internal Server Error');
                router.push('/_not-found'); // Przekieruj na błąd w przypadku problemu z API
            } finally {
                setLoading(false);
            }
        };

        checkPermission();
    }, [requiredRole, router]); // Dodaj requiredRole i router do tablicy zależności

    return { loading, error }; // Zwracaj loading i error
};

export default useCheckPermission;
