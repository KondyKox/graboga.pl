"use client";
import LoadingOverlay from "@/components/Loading";
import useProfile from "@/hooks/useProfile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProfileData from "@/types/ProfileProps";
import { CARD_GABLOTS, USER_FIELDS, USER_OPTIONS } from "../constants";
import { FaPlus } from "react-icons/fa";
import { calculateLevel, featureCard } from "../utils";
import { useState } from "react";
import Modal from "@/components/Modal";
import useCards from "@/hooks/useCards";
import Card from "@/components/card/Card";
import CardProps from "@/types/CardProps";

const UserProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<CardProps | null>(null);
  const router = useRouter();
  const cards = useCards();
  const { loading, error, profile } = useProfile();

  const [testCards, setTestCards] = useState<CardProps[]>([]); // testing

  let { level, remainingXP, xpForNextLevel } = calculateLevel(
    profile?.experience
  );
  const xpPercentage = (remainingXP / xpForNextLevel) * 100;

  // Handle click on gablot
  const handleGablotClick = (card: CardProps) => {
    if (card) setCurrentCard(card);
    setIsModalOpen(true);
  };

  // Handle feature selected card
  const handleFeatureCard = (card: CardProps) => {
    if (!profile) return;

    featureCard(profile, card, setTestCards, testCards, currentCard);
  };

  if (loading) return <LoadingOverlay message="Wczytywanie danych..." />;
  if (error) return router.push("/login");

  return (
    <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl mx-auto mt-12 pb-4">
      {/* Profil po lewej stronie na dużych ekranach, a na telefonach na górze */}
      <div className="lg:w-2/3 w-full gradient-bg text-epic p-10 rounded-xl shadow-2xl border-2 border-epic">
        <div className="flex flex-col items-center justify-center gap-6 mb-12 relative">
          <div className="relative w-32 h-32 rounded-full border-4 border-background shadow-lg">
            <CircularProgressbar
              value={xpPercentage}
              styles={buildStyles({
                pathColor: "var(--clr-special)",
                trailColor: "#000",
                strokeLinecap: "butt",
              })}
            />
            <Image
              src={profile?.profilePicture || "/donejtor.png"}
              alt="Profile Picture"
              width={64}
              height={64}
              className="w-28 h-28 rounded-full absolute top-1 left-1 shadow-epic border-1 border-background 
                          hover:drop-shadow-epic duration-300 ease-in-out"
            />
          </div>

          {/* Gablotki na karty */}
          <div className="flex justify-center items-center gap-4">
            {Array.from({ length: CARD_GABLOTS }).map((_, index) => (
              <div
                key={index}
                onClick={() => handleGablotClick(testCards[index])}
                className={`group rounded-lg p-2 transition-colors duration-300 ease-in-out
                            hover:border-legendary cursor-pointer min-w-32 min-h-52
                            flex justify-center items-center text-foreground ${
                              testCards[index] ? "" : "border-2 border-epic"
                            }`}
              >
                {testCards[index] ? (
                  <div className="w-full">
                    <Card card={testCards[index]} />
                  </div>
                ) : (
                  <FaPlus className="w-6 h-6 transition-all duration-300 ease-in-out group-hover:scale-125 text-epic group-hover:text-legendary" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* Generate user fields */}
          {USER_FIELDS.map((field, index) => {
            const value = profile?.[field.key as keyof ProfileData];

            return (
              <div key={index} className="user-field">
                <p className="text-md font-semibold text-gray-300">
                  {field.label}:{" "}
                  <span className="text-rare font-bold">
                    {field.key === "experience"
                      ? `${level} LVL (${remainingXP}/${xpForNextLevel})`
                      : Array.isArray(value)
                      ? "Invalid field"
                      : value}
                  </span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Opcje dla użytkownika */}
        <div className="flex justify-center mt-4 space-x-4">
          <div className="user-field w-full user-input">
            <button className="user-btn">Edytuj Profil</button>
          </div>
          <div className="user-field w-full user-input">
            <button className="user-btn">Zmiana Hasła</button>
          </div>
        </div>
      </div>

      {/* Opcje w panelu po prawej stronie */}
      <div className="lg:w-1/3 w-full space-y-6">
        {USER_OPTIONS.map((option, index) => (
          <div key={index} className="user-field user-input">
            <p className="text-lg font-semibold">{option.label}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false), setCurrentCard(null);
          }}
        >
          <h3 className="sub-header">Wybierz kartę</h3>
          <div className="flex flex-wrap justify-center items-stretch gap-4 overflow-auto max-h-96 w-full">
            {/* <div className="grid grid-cols-[repeat(auto-fit, minmax(200px, 1fr))] gap-4"> */}
            {cards.map((card) => (
              <div
                key={card.id}
                className="w-32 md:w-40"
                onClick={() => {
                  handleFeatureCard(card);
                  setIsModalOpen(false);
                }}
              >
                <Card card={card} />
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserProfilePage;
