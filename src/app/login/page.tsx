"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const search = useSearchParams();



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
        let redirect = search.get('redirect') || '/';
        router.push(redirect); // Przekierowanie do chronionej strony po zalogowaniu
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
      <h1 className="header">Login</h1>
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
        <button type="submit" disabled={isLoading} className="btn w-full">
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-4">
        Nie masz konta?{" "}
        <Link
          href={"/register"}
          className="text-rare hover:text-epic transition-all duration-300 ease-in-out"
        >
          Zarejestruj się tutaj!
        </Link>
      </p>
      {error && <p className="text-special mt-2">{error}</p>}
    </div>
  );
}
