import React from "react";
import {
  FaUser,
  FaStore,
  FaClipboardList,
  FaHistory,
  FaChartBar,
  FaCog,
  FaEllipsisH,
} from "react-icons/fa";

export const tabs = [
  {
    id: "users",
    label: "Zarządzanie użytkownikami",
    icon: React.createElement(FaUser),
  },
  { id: "store", label: "Sklep", icon: React.createElement(FaStore) },
  {
    id: "logs",
    label: "Logi systemowe",
    icon: React.createElement(FaClipboardList),
  },
  {
    id: "history",
    label: "Historia działań",
    icon: React.createElement(FaHistory),
  },
  {
    id: "stats",
    label: "Statystyki aplikacji",
    icon: React.createElement(FaChartBar),
  },
  { id: "settings", label: "Ustawienia", icon: React.createElement(FaCog) },
  { id: "others", label: "Inne", icon: React.createElement(FaEllipsisH) },
];
