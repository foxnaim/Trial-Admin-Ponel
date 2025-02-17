"use client"

import  Dashboard from "../components/Dashboard";
import { logout } from "../lib/auth";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold">Администратор</h1>
      <button onClick={() => { logout(); router.push("/login"); }} className="bg-gray-500 text-white p-2 rounded mt-4">
        Выйти
      </button>
      <Dashboard />
    </main>
  );
}
