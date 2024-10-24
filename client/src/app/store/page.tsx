"use client"
import useCheckSession from 'hooks/useCheckSession';
import LoadingOverlay from 'comp/Loading'; // Zakładając, że masz komponent do ładowania

const MyProtectedPage = () => {
    const { loading, error } = useCheckSession();

    if (loading) {
        return <LoadingOverlay message="Mechan Guard sprawdza twoje połączenie..." />;
    }

    if (error) {
        return <div>Wystąpił błąd: {error}</div>; // Możesz dostosować, co chcesz wyświetlić w przypadku błędu
    }

    return (
        <div>
            <h1>Strona chroniona</h1>
            <p>Witaj na stronie chronionej!</p>
        </div>
    );
};

export default MyProtectedPage;
