"use client";

import React, { useState, useEffect } from "react";
import { getRole } from "./lib/auth";

type Order = {
  id: number;
  name: string;
  status: "В обработке" | "Отправлен" | "Доставлен";
};

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrder, setNewOrder] = useState("");
  const role = getRole(); // Получаем роль пользователя

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = () => {
    if (!newOrder.trim()) return;
    const order: Order = {
      id: Date.now(),
      name: newOrder,
      status: "В обработке",
    };
    setOrders([...orders, order]);
    setNewOrder("");
  };

  const updateStatus = (id: number) => {
    if (role !== "admin") return;
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              status:
                order.status === "В обработке"
                  ? "Отправлен"
                  : order.status === "Отправлен"
                  ? "Доставлен"
                  : "Доставлен",
            }
          : order
      )
    );
  };
  return (
    <div className="p-4 max-w-lg mx-auto">
     <h2 className="text-xl font-bold mb-4">Заказы</h2>
     {role === "user" && (
      <div className="flex gap-2 mb-4">
       <input 
       type="text"
       className="border p-2 flex-1"
       placeholder="Название заказа" 
       value={newOrder}
       onChange={(e) => setNewOrder(e.target.value)}/>
       <button className="bg-gray-500 text-white p-2 rounded" onClick={addOrder}>Добавить</button>
      </div>
     )}
      <ul className="space-y-2">
        {orders.map((order) => (
          <li key={order.id} className="p-3 border rounded flex justify-between items-center">
            <span>{order.name} - {order.status}</span>

            {role === "admin" && (
              <button
                onClick={() => updateStatus(order.id)}
                className="bg-green-500 text-white px-2 py-1 rounded"
                disabled={order.status === "Доставлен"}
              >
                {order.status === "Доставлен" ? "Готово" : "Следующий статус"}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
