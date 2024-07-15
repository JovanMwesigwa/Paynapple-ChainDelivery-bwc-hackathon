import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const TrackOrderInput = () => {
  return (
    <div className="w-full h-44 flex flex-col px-4 bg-orange-100 rounded-lg justify-evenly">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold">Track your package 📦</h1>
        <p className="text-sm font-light">Please enter your order number</p>
      </div>

      <div className="w-full h-[46px] flex flex-row items-center relative ">
        <Input
          className="rounded-full h-full w-full pl-6 text-lg outline-none"
          type="number"
        />
        <div className="size-9 cursor-pointer hover:bg-green-400 rounded-full bg-green-500 absolute right-2 flex items-center justify-center  ">
          <Search size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default TrackOrderInput;
