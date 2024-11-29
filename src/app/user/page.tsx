"use client";
import LoadingOverlay from "@/components/Loading";
import useProfile from "@/hooks/useProfile";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { userFields, userOptions } from "./constants";
import ProfileData from "@/types/ProfileProps";

function calculateLevel(points: number | undefined) {
  if (points == undefined)
    return {
      level: 0,
      remainingXP: 0,
      xpForNextLevel: 0,
    };

  const baseXP = 200; // Liczba punktów potrzebna do osiągnięcia 1 poziomu
  const multiplier = 1.13; // Mnożnik wzrostu punktów potrzebnych na kolejne poziomy

  let level = 0;
  let xpForNextLevel = baseXP;

  while (points >= xpForNextLevel) {
    points -= xpForNextLevel;
    level++;
    xpForNextLevel = Math.floor(baseXP * Math.pow(multiplier, level));
  }

  return {
    level: level,
    remainingXP: points,
    xpForNextLevel: xpForNextLevel,
  };
}

const UserProfilePage = () => {
  const router = useRouter();
  const { loading, error, profile } = useProfile();

  let { level, remainingXP, xpForNextLevel } = calculateLevel(
    profile?.experience
  );
  const xpPercentage = (remainingXP / xpForNextLevel) * 100;

  if (loading) return <LoadingOverlay message="Wczytywanie danych..." />;
  if (error) return router.push("/login");

  return (
    <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl mx-auto mt-12">
      {/* Profil po lewej stronie na dużych ekranach, a na telefonach na górze */}
      <div className="lg:w-2/3 w-full gradient-bg text-epic p-10 rounded-xl shadow-2xl border-2 border-epic">
        <div className="flex justify-center mb-12 relative">
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
        </div>

        <div className="space-y-4">
          {/* Generate user fields */}
          {userFields.map((field, index) => (
            <div key={index} className="user-field">
              <p className="text-md font-semibold text-gray-300">
                {field.label}:{" "}
                <span className="text-rare font-bold">
                  {field.key === "experience"
                    ? `${level} LVL (${remainingXP}/${xpForNextLevel})`
                    : profile?.[field.key as keyof ProfileData]}
                </span>
              </p>
            </div>
          ))}
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
        {userOptions.map((option, index) => (
          <div key={index} className="user-field user-input">
            {option.link ? (
              <Link href={option.link} className="w-full">
                <p className="text-lg font-semibold">{option.label}</p>
              </Link>
            ) : (
              <p className="text-lg font-semibold">{option.label}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfilePage;
