"use client";

import { useState } from "react";
import LoadingOverlay from "@/components/Loading";
import { useAdminData } from "@/hooks/useAdminData";
import { tabs } from "./constants";
import UserPanel from "@/components/admin/UsersPanel";
import StorePanel from "@/components/admin/StorePanel";
import TransactionPanel from "@/components/admin/TransactionsPanel";

const AdminPage = () => {
  const { loading, error, users, store } = useAdminData();
  const [activeTab, setActiveTab] = useState("users");

  const panels: Record<string, JSX.Element> = {
    users: <UserPanel users={users} />,
    store: <StorePanel store={store} />,
    transactions: <TransactionPanel />,
  };

  if (loading) return <LoadingOverlay message="Wczytywanie danych..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl mx-auto mt-12">
      {/* Panel boczny nawigacji */}
      <div className="lg:w-1/4 w-full gradient-bg p-6 rounded-xl shadow-xl border-2 border-epic">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Panel administracyjny
        </h2>
        <div className="space-y-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`user-btn p-3 ${
                activeTab === tab.id ? "bg-gray-700" : "bg-gray-800"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
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
