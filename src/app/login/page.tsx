"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token); // Zapisz token JWT do localStorage
        router.push("/"); // Przekierowanie do chronionej strony po zalogowaniu
      } else {
        const data = await res.json();
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2 p-4 flex flex-col justify-center items-center w-full">
      <h1 className="text-6xl p-4 lg:text-8xl">Login</h1>
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center items-center gap-6"
      >
        <div className="py-2 flex flex-col justify-center items-center gap-4">
          <input
            type="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" disabled={isLoading} className="btn">
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p className="text-special mt-2">{error}</p>}
    </div>
  );
}
