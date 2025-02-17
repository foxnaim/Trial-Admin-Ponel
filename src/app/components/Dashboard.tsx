import React, { useState, useEffect } from "react";
import { getRole } from "../lib/auth";

type Order = {
  id: number;
  name: string;
  status: "В обработке" | "Отправлен" | "Доставлен";
};

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrder, setNewOrder] = useState("");
  const role = getRole(); // Получаем роль пользователя

  // Загружаем заказы из localStorage при загрузке страницы
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Обновляем localStorage при изменении orders
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);

  const addOrder = () => {
    if (!newOrder.trim()) return;
    const order: Order = {
      id: Date.now(),
      name: newOrder,
      status: "В обработке",
    };
    const updatedOrders = [...orders, order];
    setOrders(updatedOrders);
    setNewOrder("");

    // Сразу сохраняем в localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const updateOrderStatus = (id: number, newStatus: "В обработке" | "Отправлен" | "Доставлен") => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);

    // Сразу сохраняем в localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const deleteOrder = (id: number) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);

    // Сразу сохраняем в localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
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
            onChange={(e) => setNewOrder(e.target.value)}
          />
          <button className="bg-gray-500 text-white p-2 rounded" onClick={addOrder}>
            Добавить
          </button>
        </div>
      )}
      <ul className="space-y-2">
        {orders.map((order) => (
          <li key={order.id} className="p-3 border rounded flex justify-between items-center">
            <span>{order.name} - {order.status}</span>
            <div className="flex gap-4 ml-5">
              {role === "admin" && (
                <>
                  <button
                    onClick={() => updateOrderStatus(order.id, "Отправлен")}
                    className="bg-blue-500 text-white p-1 rounded"
                  >
                    Отправить
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, "Доставлен")}
                    className="bg-green-500 text-white p-1 rounded"
                  >
                    Доставить
                  </button>
                </>
              )}
              <button
                onClick={() => deleteOrder(order.id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
