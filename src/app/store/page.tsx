"use client";
import { useEffect, useState } from "react";
import useCheckSession from "hooks/useCheckSession";
import LoadingOverlay from "comp/Loading"; // Zakładając, że masz komponent do ładowania
import Pack from "@/components/pack/Pack";
import RunningMuchaStore from "@/game_modes/running_mucha/components/RunningMuchaStore";

const MyProtectedPage = () => {
  const { loading: sessionLoading, error: sessionError } = useCheckSession();
  const [storeData, setStoreData] = useState(null);
  const [storeLoading, setStoreLoading] = useState(true);
  const [storeError, setStoreError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await fetch("/api/shop.json/v1", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch store data");
        }

        const store = await response.json();
        setStoreData(store);
      } catch (error: any) {
        setStoreError(error.message || "Error fetching store data");
      } finally {
        setStoreLoading(false);
      }
    };

    // Fetch store data only after session is validated
    if (!sessionLoading && !sessionError) {
      fetchStoreData();
    }
  }, [sessionLoading, sessionError]);

  if (sessionLoading || storeLoading) {
    return (
      <LoadingOverlay message="Mechan Guard sprawdza twoje połączenie..." />
    );
  }

  if (sessionError) return <div>Wystąpił błąd: {sessionError}</div>; // Możesz dostosować, co chcesz wyświetlić w przypadku błędu sesji

  if (storeError) return <div>Wystąpił błąd z danymi sklepu: {storeError}</div>; // Obsługa błędu danych sklepu

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="header">SKLEP</h1>

      {/* Wyświetlenie danych sklepu, jeżeli zostały pobrane */}
      {storeData ? (
        <section className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col border-b-2 p-4 rounded-lg w-full">
            <h3 className="sub-header text-legendary">Paczki</h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">
              {storeData.packs.map((pack: any) => {
                return <Pack storeData={pack} />;
              })}
            </div>
            {/* <div className={styles.StorePackWrapper}>
            <div className={styles.StorePackMark}>NEW</div>
            <p style={{ position: "relative" }}>{storeData.pack_cost}</p>
          </div> */}
            {/* <pre>{JSON.stringify(storeData, null, 2)}</pre> Możesz dostosować wyświetlanie */}
          </div>

          {/* Skiny z Running Mucha */}
          <RunningMuchaStore />
        </section>
      ) : (
        <p>Brak danych sklepu</p>
      )}
    </div>
  );
};

export default MyProtectedPage;
