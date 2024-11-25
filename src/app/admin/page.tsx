"use client";

import { useState } from "react";
import LoadingOverlay from "@/components/Loading";
import { useAdminData } from "@/hooks/useAdminData";
import { tabs } from "./constants";
import UserPanel from "@/components/admin/UsersPanel";
import StorePanel from "@/components/admin/StorePanel";
import TransactionPanel from "@/components/admin/TransactionsPanel";
import LogsPanel from "@/components/admin/LogsPanel";

const AdminPage = () => {
  const { loading, error, users, store, logs } = useAdminData();
  const [activeTab, setActiveTab] = useState("users");
  const [showIcons, setShowIcons] = useState(false);

  const panels: Record<string, JSX.Element> = {
    users: <UserPanel users={users} />,
    store: <StorePanel store={store} />,
    transactions: <TransactionPanel />,
    logs: <LogsPanel logs={logs} />,
  };

  if (loading) return <LoadingOverlay message="Wczytywanie danych..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl mx-auto mt-12">
      {/* Panel boczny nawigacji */}
      <div className="lg:w-1/4 w-full gradient-bg p-6 rounded-xl shadow-xl border-2 border-epic">
        <h2 className="text-xl font-semibold text-center mb-6 md:mb-0">
          Panel administracyjny
        </h2>
        {/* Przełącznik tylko dla desktopu */}
        <div className="hidden md:block text-center mb-6">
          <label className="flex items-center justify-center gap-2 cursor-pointer text-sm">
            <span className="text-gray-700">
              {showIcons ? "Tekst i ikony" : "Tylko ikony"}
            </span>
            <input
              type="checkbox"
              checked={showIcons}
              onChange={() => setShowIcons(!showIcons)}
              className="sr-only"
            />
            <div className="relative">
              <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
              <div
                className={`absolute left-1 top-1 w-4 h-4 bg-foreground rounded-full transition-transform ${
                  showIcons ? "transform translate-x-4" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>
        <div className="space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`user-btn p-3 ${
                activeTab === tab.id ? "bg-gray-700" : "bg-gray-800"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex items-center gap-4 px-2">
                {tab.icon}
                <span
                  className={`hidden self-center ${
                    showIcons ? "hidden" : "md:inline"
                  }`}
                >
                  {tab.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Główna sekcja */}
      <div className="lg:w-3/4 w-full">
        {panels[activeTab] || (
          <h3 className="sub-header text-center">Zakładka nie istnieje</h3>
        )}
        {/* Other tabs (transactions, logs, etc.) remain as before */}
        {/* Add more tabs as Components like logs, history, stats, etc. & add them to constants.ts */}
      </div>
    </div>
  );
};

export default AdminPage;
