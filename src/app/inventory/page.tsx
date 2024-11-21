"use client";

import { useEffect, useState } from "react";
import Card from "@/components/card/Card";
import useCards from "@/hooks/useCards";
import FilterDropdown from "@/components/FilterDropdown";

const Inventory = () => {
  const cards = useCards();
  const [filterRarity, setFilterRarity] = useState<string>("");
  const [filterTeacher, setFilterTeacher] = useState<string>("");
  const [rarityOptions, setRarityOptions] = useState<string[]>([]);
  const [teacherOptions, setTeacherOptions] = useState<string[]>([]);

  // Fetch filters.json from the public folder
  useEffect(() => {
    const fetchFilters = async () => {
      const res = await fetch("/data/filters.json");
      const data = await res.json();
      setRarityOptions(data.rarityOptions);
      setTeacherOptions(data.teacherOptions);
    };
    fetchFilters();
  }, []);

  // Apply filters
  const filteredCards = cards.filter((card) => {
    const matchesRarity = !filterRarity || card.rarity === filterRarity;
    const matchesTeacher = !filterTeacher || card.teacher === filterTeacher;
    return matchesRarity && matchesTeacher;
  });

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-6xl">Ekwipunek</h1>

      {/* Filter Dropdowns */}
      <div className="flex flex-col justify-center items-stretch gap-4 my-4">
        <FilterDropdown
          label="Rarity"
          options={rarityOptions}
          value={filterRarity}
          onChange={setFilterRarity}
        />
        <FilterDropdown
          label="Nauczyciel"
          options={teacherOptions}
          value={filterTeacher}
          onChange={setFilterTeacher}
        />
      </div>

      {/* Cards Grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
