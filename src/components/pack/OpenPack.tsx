import { useState } from 'react';

export default function OpenPack(props: any) {
  const [packData, setPackData] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [packOpened, setPackOpened] = useState(false);

  // Funkcja otwierająca paczkę i pobierająca karty z API
  const openPack = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/pack/openPack');

      if (!response.ok) throw new Error('Failed to open pack');

      const data = await response.json();
      setPackData(data.pack.cards); // Ustawiamy wylosowane karty
      setPackOpened(true); // Zmieniamy stan na otwartą paczkę
    } catch (error) {
      console.error('Error opening pack:', error);
    }
    setLoading(false);
  };

  // Funkcja do odsłonięcia kolejnej karty po kliknięciu na aktualnie wyświetloną kartę
  const revealNextCard = () => {
    if (currentCardIndex < packData.length - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    } else {
      setPackOpened(false); // Zamknij overlay, gdy odkryto wszystkie karty
      setCurrentCardIndex(0); // Zresetuj indeks na kolejne otwarcie paczki
    }
  };

  return (
    <div>
      {/* Przycisk do otwierania paczki */}
      {!packOpened ? (
        <button onClick={openPack} disabled={loading}
            style={{
                border: '1px solid black',
                padding: '5px 10px',
                borderRadius: '5px',
                backgroundColor: 'white',
                color: 'black'
            }}>
          {loading ? 'Loading...' : props.title}
        </button>
      ) : (
        <p>Kliknij na kartę, aby odkryć kolejną!</p>
      )}

      {/* Overlay wyświetlający aktualnie odkrytą kartę */}
      {packOpened && packData.length > 0 && (
        <div
          onClick={revealNextCard}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(26, 26, 26)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              cursor: 'pointer',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              maxWidth: '300px',
              boxShadow: '0 0 15px rgba(0,0,0,0.5)',
            }}
          >
            <img src={packData[currentCardIndex].image} alt={packData[currentCardIndex].name} width="100%" />
            <h4>{packData[currentCardIndex].name}</h4>
            <p>{packData[currentCardIndex].description}</p>
            <p><strong>Rzadkość:</strong> {packData[currentCardIndex].rarity}</p>
          </div>
        </div>
      )}
    </div>
  );
}
