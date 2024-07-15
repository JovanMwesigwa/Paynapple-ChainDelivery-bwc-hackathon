import { ReactNode } from "react";
import BottomTabs from "./bottomtabs";
import MainHeader from "./main-header";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-1 flex-col relative">
      <MainHeader />
      {children}

      <BottomTabs />
    </div>
  );
};

export default MainLayout;
