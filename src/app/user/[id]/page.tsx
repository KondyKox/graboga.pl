"use client";
import LoadingOverlay from "@/components/Loading";
import useProfile from "@/hooks/useProfile";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProfileData from "@/types/ProfileProps";
import { CARD_GABLOTS, USER_FIELDS, USER_OPTIONS } from "../constants";
import { calculateLevel, deleteFeaturedCard, featureCard } from "../utils";
import { useState } from "react";
import Modal from "@/components/Modal";
import useCards from "@/hooks/useCards";
import Card from "@/components/card/Card";
import CardProps from "@/types/CardProps";
import CardGablot from "@/components/card/CardGablot";

const UserProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<CardProps | null>(null);
  const params = useParams();
  const router = useRouter();
  const cards = useCards();
  const { loading, error, profile } = useProfile();

  const profileId = Array.isArray(params.id) ? params.id[0] : params.id;
  const isOwnProfile = profile?.playerId === profileId;

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

  // Delete featured card
  const handelDeleteFeaturedCard = (card: CardProps) => {
    setIsModalOpen(false);
    setCurrentCard(null);
    deleteFeaturedCard(card, testCards, setTestCards);
  };

  if (loading) return <LoadingOverlay message="Wczytywanie danych..." />;
  if (error) return router.push("/login");

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-10 w-full max-w-7xl mx-auto mt-12 p-4">
      {/* Profil po lewej stronie na dużych ekranach, a na telefonach na górze */}
      <div className="lg:w-3/4 w-full gradient-bg text-epic p-6 rounded-xl shadow-2xl border-2 border-epic">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 place-items-stretch w-full">
            {Array.from({ length: CARD_GABLOTS }).map((_, index) => (
              <CardGablot
                cards={testCards}
                index={index}
                onClick={handleGablotClick}
              />
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
        {isOwnProfile && (
          <div className="flex justify-center mt-4 space-x-4">
            <div className="user-field w-full user-input">
              <button className="user-btn">Edytuj Profil</button>
            </div>
            <div className="user-field w-full user-input">
              <button className="user-btn">Zmiana Hasła</button>
            </div>
          </div>
        )}
      </div>

      {/* Opcje w panelu po prawej stronie */}
      {isOwnProfile && (
        <div className="lg:w-1/4 w-full space-y-6">
          {USER_OPTIONS.map((option, index) => (
            <div key={index} className="user-field user-input">
              <p className="text-lg font-semibold">{option.label}</p>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false), setCurrentCard(null);
          }}
        >
          <div className="p-2 border-b-2">
            <h3 className="sub-header">Wybierz kartę</h3>
            {currentCard && (
              <button
                className="btn w-full hover:bg-red-600 hover:border-red-600"
                onClick={() => handelDeleteFeaturedCard(currentCard)}
              >
                Usuń kartę
              </button>
            )}
          </div>
          <div className="flex flex-wrap justify-center items-stretch gap-4 overflow-auto max-h-96 w-full pt-4">
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
