"use client";

import { Bell, FolderKanban, Home, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomTabs = () => {
  const pathname = usePathname();

  const isAddPage = pathname === "/add";
  const onHomePage = pathname === "/";

  return (
    <div className="w-full absolute bg-white h-16 shadow-lg border-t-2 border-neutral-100 right-0 left-0 bottom-0 flex flex-row items-center px-10 justify-between ">
      <Link
        href="/"
        className={`flex flex-col items-center h-full justify-evenly`}
      >
        <Home
          size={24}
          className={` ${onHomePage ? "text-green-500" : " text-neutral-300"}`}
        />

        {onHomePage && <div className="size-2 bg-green-500 rounded-full"></div>}
      </Link>

      <div className="flex flex-col items-center h-full justify-evenly">
        <FolderKanban size={24} className="text-neutral-300" />

        {/* <div className="size-2 bg-green-500 rounded-full"></div> */}
      </div>

      <Link
        href="/add"
        className="flex flex-col items-center h-full justify-evenly hover:text-green-400"
      >
        <PlusCircle
          size={40}
          className={` ${isAddPage ? "text-green-500" : " text-neutral-300"}`}
        />
      </Link>

      <div className="flex flex-col items-center h-full justify-evenly">
        <Bell size={24} className="text-neutral-300" />

        {/* <div className="size-2 bg-green-500 rounded-full"></div> */}
      </div>

      <div className="flex flex-col items-center h-full justify-evenly">
        <Settings size={24} className="text-neutral-300" />

        {/* <div className="size-2 bg-green-500 rounded-full"></div> */}
      </div>
    </div>
  );
};

export default BottomTabs;
