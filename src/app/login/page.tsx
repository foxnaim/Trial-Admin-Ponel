"use client";

import { useRouter } from "next/navigation";
import { login } from "../lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (role: "user" | "admin") => {
   login(role);
    router.push(role === "admin" ? "/admin" : "/user");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-20">
      <h2 className="text-xl font-bold">Вход</h2>
      <button onClick={() => handleLogin("user")} className="bg-blue-500 text-white p-2 rounded">
        Войти как Пользователь
      </button>
      <button onClick={() => handleLogin("admin")} className="bg-red-500 text-white p-2 rounded">
        Войти как Администратор
      </button>
    </div>
  );
}
