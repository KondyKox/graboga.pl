import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import Image from "next/image";
import SubscriptionProps from "@/types/SubsProps"; // Załóżmy, że masz odpowiedni typ

const Subscription = ({ subscriptionData }: any) => {
  const [isSubscribed, setIsSubscribed] = useState(false); // Stan subskrypcji
  const [loading, setLoading] = useState(false); // Stan ładowania

  // Funkcja do aktywacji subskrypcji
  const handleSubscription = async () => {
    if (loading || isSubscribed) return; // Zapobiega wielokrotnemu kliknięciu

    setLoading(true);
    try {
      // Tutaj wysyłamy zapytanie do API, aby aktywować subskrypcję
      const response = await fetch("/api/subscription/activate", {
        method: "POST",
        body: JSON.stringify({ subscriptionId: subscriptionData.subscription_id }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to subscribe");

      // Ustawiamy subskrypcję na aktywną
      setIsSubscribed(true);
    } catch (error) {
      console.error("Error subscribing:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 border rounded-lg shadow-lg w-80">
      <h4 className="font-bold text-xl">{subscriptionData.name}</h4>

      {/* Wyświetlanie obrazu subskrypcji */}
      <div
        className="relative w-full h-32 rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${subscriptionData.image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Opis subskrypcji */}
      <p className="text-center text-gray-600 mt-2">{subscriptionData.description}</p>

      {/* Funkcje subskrypcji */}
      <ul className="mt-4 space-y-2 text-sm text-gray-700">
        {subscriptionData.features.map((feature: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-green-500">✔</span> {feature}
          </li>
        ))}
      </ul>

      {/* Cena subskrypcji */}
      <div className="mt-4 flex justify-between items-center w-full">
        <span className="text-lg font-bold">
          {subscriptionData.price} <span className="text-sm">USD</span>
        </span>

        {/* Przycisk subskrypcji */}
        <button
          onClick={handleSubscription}
          className={`mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md ${
            isSubscribed || loading ? "cursor-not-allowed opacity-50" : "hover:bg-blue-700"
          }`}
          disabled={isSubscribed || loading}
        >
          {loading ? "Ładowanie..." : isSubscribed ? "Zasubskrybowano" : "Subskrybuj"}
        </button>
      </div>
    </div>
  );
};

export default Subscription;
