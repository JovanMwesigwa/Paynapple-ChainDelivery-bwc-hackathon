"use client";

import MainLayout from "@/components/main-layout";
import useFetchItemsWithArgs from "@/hooks/queries/useFetchItemWithArgs";
import { Loader } from "lucide-react";
import CurrentOrderCard from "./components/current-order-card";
import RecentOrderCard from "./components/recent-order-card";
import TrackOrderInput from "./components/trackorder-input";
import { useState } from "react";
import useFetchOrder from "@/hooks/graphql/useFetchOrder";

export default function Home() {
  const [orderId, setOrderId] = useState<number | string>(4);
  const { data, error, isLoading } = useFetchOrder(orderId.toString());

  return (
    <MainLayout>
      <main className="flex flex-1 flex-col p-5">
        <TrackOrderInput />

        {/*  */}
        <h1 className="text-base font-semibold my-6">Current shipment</h1>

        {/* Curren order card */}
        <CurrentOrderCard item={data} />

        {/* Previous */}
        <div className="flex w-full items-center my-6 justify-between">
          <h1 className="text-base font-semibold ">Active deliveries</h1>
          <h1 className="text-sm font-bold text-green-400 ">View all</h1>
        </div>

        {/* Recent deliveries card... */}
        {isLoading ? (
          <div className="w-full items-center justify-center">
            <Loader className="animate-spin text-neutral-400" size={12} />
          </div>
        ) : (
          <RecentOrderCard item={data} />
        )}
      </main>
    </MainLayout>
  );
}
