import { useState } from "react";

export default function OpenPack({ packData, onClose }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Funkcja do odsłonięcia kolejnej karty po kliknięciu na aktualnie wyświetloną kartę
  const revealNextCard = () => {
    if (currentCardIndex < packData.length - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    } else {
      onClose();
      setCurrentCardIndex(0); // Zresetuj indeks na kolejne otwarcie paczki
    }
  };

  return (
    <div
      onClick={revealNextCard}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(26, 26, 26, 0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          cursor: "pointer",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          maxWidth: "300px",
          boxShadow: "0 0 15px rgba(0,0,0,0.5)",
        }}
      >
        <img
          src={packData[currentCardIndex].image}
          alt={packData[currentCardIndex].name}
          width="100%"
        />
        <h4>{packData[currentCardIndex].name}</h4>
        <p>{packData[currentCardIndex].description}</p>
        <p>
          <strong>Rzadkość:</strong> {packData[currentCardIndex].rarity}
        </p>
      </div>
    </div>
  );
}
