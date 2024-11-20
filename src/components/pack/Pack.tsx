import PackProps from "@/types/PackProps";
import { useState } from "react";
import OpenPack from "./OpenPack";
import Image from "next/image";

const Pack = ({ storeData }: PackProps) => {
  const [packData, setPackData] = useState([]);
  const [packOpened, setPackOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  // Funkcja otwierająca paczkę i pobierająca karty z API
  const openPack = async (id: string) => {
    if (packOpened || loading) return; // Prevent opening while loading or already opened

    setLoading(true);
    try {
      const response = await fetch(`/api/pack/${id}/open`);

      if (!response.ok) {
        // Jeśli odpowiedź jest błędna (np. 500), sprawdź, czy jest wiadomość
        const errorData = await response.json(); // Przekształć odpowiedź na JSON
        const errorMessage = errorData.message || "An error occurred"; // Pobierz wiadomość lub ustaw domyślną
      
        throw new Error(`Failed to open pak: ${errorMessage}`); // Rzuć błąd z wiadomością
      }

      const data = await response.json();
      setPackData(data.pack.cards); // Ustawiamy wylosowane karty
      setPackOpened(true); // Zmieniamy stan na otwartą paczkę
    } catch (error) {
      console.error("Error opening pack:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h4 className="font-bold tracking-widest text-lg">{storeData.pack_name}</h4>

      {/* Hide pack UI if the pack is opened or loading */}
      {!packOpened && !loading && (
        <div
          className="relative inline-block h-56 w-48 text-foreground rounded gradient-border shadow-epic group cursor-pointer"
          onClick={() => openPack(`pack_${storeData.pack_id}`)}
        >
          {/* Background for pack */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-100 group-hover:opacity-40 transition-opacity duration-300 rounded"
            style={{
              backgroundImage: `url(${storeData.pack_img})`,
            }}
          ></div>

          {/* Pack name */}
          <div className="absolute h-8 w-full -translate-y-8 text-foreground text-xs text-center py-2 -z-10 rounded flex justify-center items-center">
            <h4 className="font-bold tracking-widest text-lg">
              {storeData.pack_name}
            </h4>
          </div>

          {/* Pack description */}
          <div className="absolute py-2 px-1 z-10 flex justify-center items-center transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            <span className="text-center">{storeData.pack_description}</span>
          </div>

          {/* Pack cost */}
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full py-1 flex flex-col justify-between items-center bg-gradient 
                    rounded-b opacity-80 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
          >
            <div className="flex justify-between items-center px-2 w-full ">
              <span className="font-bold flex justify-center items-center gap-2">
                {!loading ? (
                  <>
                    {storeData.pack_cost}
                    <Image
                      src="/boski_dukat.png"
                      alt="Boski Dukat"
                      width={20}
                      height={20}
                    />
                  </>
                ) : (
                  "Loading..."
                )}
              </span>
              <div className="relative font-bold rounded-lg px-4 py-2 text-common">
                -20%
              </div>
            </div>
            <div className="relative opacity-90 w-full text-center text-special font-bold rounded-b-lg px-4 py-1">
              1h 54min
            </div>
          </div>
        </div>
      )}

      {/* Display cards from pack */}
      {packOpened && (
        <OpenPack packData={packData} onClose={() => setPackOpened(false)} />
      )}
    </div>
  );
};

export default Pack;
