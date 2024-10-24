import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push('/login'); // Przekierowanie na stronę logowania, jeśli nie ma tokenu
    }
  }, [router]);

  return isAuthenticated;
};

export default useAuth;
