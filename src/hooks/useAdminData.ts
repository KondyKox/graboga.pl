import { LogsItem, StoreItem, User } from "@/types/AdminProps";
import { useState, useEffect } from "react";

export const useAdminData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [store, setStore] = useState<StoreItem[]>([]);
  const [logs, setLogs] = useState<LogsItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersResponse, storeResponse, logsResponse] = await Promise.all([
          fetch("/api/admin/users"),
          fetch("/api/admin/store"),
          fetch("/api/logger/view"),
        ]);

        if (!usersResponse.ok || !storeResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        setUsers(await usersResponse.json());
        setStore(await storeResponse.json());
        setLogs(await logsResponse.json());
      } catch (err) {
        setError("Nie udało się załadować danych");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error, users, store, logs };
};
