import { useState } from "react";

export default function OpenPack({ packData, onClose }: any) {
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
        position: "fixed", // Ensure it covers the full screen
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "100vw", // Full width of the viewport
        height: "100vh", // Full height of the viewport
        backgroundColor: "rgba(26, 26, 26)", // Dark background with transparency
        display: "flex",
        justifyContent: "center", // Center the card horizontally
        alignItems: "center", // Center the card vertically
        overflow: "hidden", // Prevent scrolling
      }}
    >
      <div
        style={{
          cursor: "pointer",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          maxWidth: "90%", // Max width of the card (responsive)
          maxHeight: "90%", // Max height of the card (responsive)
          boxShadow: "0 0 15px rgba(0,0,0,0.5)", // Shadow around the card
          overflowY: "auto", // In case content overflows vertically
        }}
      >
        <img
          src={packData[currentCardIndex].image}
          alt={packData[currentCardIndex].name}
          width="100%" // Image takes up the full width of the card
          style={{ objectFit: "cover", maxHeight: "300px" }} // Ensures image doesn't overflow
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
