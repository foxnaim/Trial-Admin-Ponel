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
  const [newOrder, setNewOrder] = useState('');
  return (
    <></>
  );
};

export default Dashboard;
