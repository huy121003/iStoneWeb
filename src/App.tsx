import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import SubPage from "./pages/HomePages/SubPage";
import HomePage from "./pages/HomePages/HomePage";
import DetailPage from "./pages/HomePages/DetailPage";
import CartPage from "./pages/CartPages/CartPage";

function App() {
  return (
    <Router>
      <HomeLayout>
        <Routes>
          {/* Trang chính */}
          <Route path="/" element={<HomePage />} />

          
          <Route path="/subpage/:categoryId" element={<SubPage />} />

          <Route path="/detail/:productId" element={<DetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </HomeLayout>
    </Router>
  );
}

export default App;
