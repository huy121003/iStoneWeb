import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import SubPage from './pages/HomePages/SubPage';
import HomePage from './pages/HomePages/HomePage';
import DetailPage from './pages/HomePages/DetailPage';


function App() {
  return (
    <Router>
      <HomeLayout>
        <Routes>
          {/* Trang chính */}
          <Route path="/" element={<HomePage/>} />
          
          {/* Trang SubPage với đường dẫn động dựa trên categoryId */}
          <Route path="/subpage/:categoryId" element={<SubPage />} />
          
          <Route path="/detail/:productId" element={<DetailPage/>}/>
        </Routes>
      </HomeLayout>
    </Router>
  );
}

export default App;
