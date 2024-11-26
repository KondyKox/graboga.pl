"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        router.push("/login"); // Przekierowanie do strony logowania po rejestracji
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2 p-4 flex flex-col justify-center items-center w-full">
      <h1 className="header">Register</h1>
      <form
        onSubmit={handleRegister}
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="mt-4">
        Masz już konto?{" "}
        <Link
          href={"/login"}
          className="text-rare hover:text-epic transition-all duration-300 ease-in-out"
        >
          Zaloguj się tutaj!
        </Link>
      </p>
      {error && <p className="text-special mt-2">{error}</p>}
    </div>
  );
}
