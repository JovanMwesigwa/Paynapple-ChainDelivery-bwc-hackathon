import { Separator } from "@/components/ui/separator";
import { ArrowRight, Box } from "lucide-react";
import Link from "next/link";
import React from "react";

const CurrentOrderCard = ({ item }: { item: any }) => {
  const getStatus = (status: string | number) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Processing";
      case 2:
        return "Delivered";
      default:
        return "Pending";
    }
  };

  if (!item || !item.packageName)
    return (
      <div className="w-full h-64 bg-slate-100 rounded-lg flex flex-col p-4 gap-y-4 items-center justify-center ">
        <h1 className="text-neutral-300">No shipment found</h1>

        <Link
          href="/add"
          className="flex items-center justify-center bg-green-100 rounded-full p-3 cursor-pointer px-5"
        >
          <h1 className="text-xs text-green-400 font-bold">
            Create your shipment
          </h1>
          <ArrowRight size={16} className="text-green-400" />
        </Link>
      </div>
    );

  return (
    <div className="w-full h-64 bg-slate-100 rounded-lg flex flex-col p-4 gap-y-4 ">
      <div className="w-full flex flex-row  justify-between ">
        <div className="flex flex-row gap-x-3">
          <div className="size-10 flex items-center justify-center bg-black rounded-full">
            <Box size={23} className="text-white" />
          </div>
          <div className="flex flex-col">
            <h1>{item.packageName}</h1>
            <p className="text-xs font-light text-neutral-500">
              Order No: {item.id.toString()}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <Separator />
      <div className="flex flex-1 flex-grow flex-row gap-x-4">
        {/* Left */}
        <div className="flex h-full w-6   flex-col justify-between items-center py-2 ">
          <div className="size-3 rounded-full bg-green-500"></div>
          <div
            className={`h-2/3 w-[1px]  my-1  ${
              item.status == 2 ? "bg-green-500" : "bg-neutral-300"
            } `}
          ></div>
          <div
            className={`size-3 rounded-full  border-2 ${
              item.status == 2 ? "bg-green-500" : " border-neutral-300"
            }`}
          ></div>
        </div>

        {/* Right */}
        <div className="flex w-full h-full flex-col justify-between ">
          <div className="flex flex-col ">
            <p className="text-xs text-neutral-500">From:</p>
            <h1 className="text-sm font-semibold">
              Kawempe Lugoba, Kampala Wakiso
            </h1>
          </div>

          {/* to */}
          <div className="flex flex-col">
            <p className="text-xs text-neutral-500">Delivery to:</p>
            <h1 className="text-sm font-semibold">
              Kawempe Lugoba, Kampala Wakiso
            </h1>
          </div>
        </div>
      </div>

      <Separator />

      {/* package status */}
      <div className="w-full flex flex-row items-center">
        <div className="flex w-full">
          <h1 className="text-sm text-neutral-400 font-semibold">Status:</h1>
          <h1 className="text-sm ml-1">
            {" "}
            Your package is in{" "}
            <span className="text-green-400 font-semibold">
              {getStatus(item.status)}
            </span>
          </h1>
        </div>

        {item.status != 2 && (
          <Link
            href="/map"
            className="flex items-center justify-center bg-green-100 rounded-full px-4 py-1"
          >
            <h1 className="text-xs text-green-400 font-bold">Track</h1>
            <ArrowRight size={16} className="text-green-400" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default CurrentOrderCard;
