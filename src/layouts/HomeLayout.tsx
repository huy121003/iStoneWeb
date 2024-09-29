import { ReactNode } from "react";
import Header from "../components/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
interface HomeLayoutProps {
  children: ReactNode;
}

function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className={`flex-1 max-h-screen overflow-y-auto`}>
      <Header />
       
      <div className="flex-1 ">{children}</div>
    </div>
  );
}

export default HomeLayout;
