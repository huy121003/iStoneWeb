import { ReactNode } from "react";
import Header from "../components/Header";

interface HomeLayoutProps {
  children: ReactNode;
}

function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className={`flex-1 max-h-[100vh] overflow-y-auto`}>
      <Header />
       
      <div className="">{children}</div>
    </div>
  );
}

export default HomeLayout;
