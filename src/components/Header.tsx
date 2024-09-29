import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FetchCategoryApi } from "../apis/CategoryApi";
import { ICategories } from "../models/ICategories";

function Header() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const handleCategoryClick = (categoryId: number) => {
    // Điều hướng đến trang SubPage với categoryId trong URL
   //console.log(categoryId);
    navigate(`/subpage/${categoryId}`);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const newCategories = await FetchCategoryApi();
        setCategories(newCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);


  return (
    <div className="flex-1 flex-col">
      <div className="flex-1  fixed w-full">
        <div className="flex justify-between h-10 py-2 md:px-28 px-4 bg-slate-800">
          <div className="flex justify-between w-72">
            <p className="text-white font-normal text-sm leading-6">
              iStone for Education
            </p>
            <p className="text-white font-normal text-sm leading-6">
              iStone for Enterprise
            </p>
          </div>
          <div className="flex gap-5 justify-end">
            <i className="fa-solid fa-magnifying-glass text-white text-xl" />
            <i className="fa-solid fa-bag-shopping text-white text-xl" />
            <i className="fa-regular fa-user text-white text-xl" />
          </div>
        </div>

        {/* Thanh menu chính */}
        <div className="flex justify-between items-center bg-white h-14 py-2  md:px-28 px-4 ">
          <div className="flex items-center"
          onClick={() => navigate('/')} // Điều hướng khi click
          >
            <img src="/logo.png" alt="logo" className="w-6 h-6" />
            <p className="text-black font-bold text-2xl">
              <i className="text-emerald-500">i</i>Stone
            </p>
            <div className="h-7 border-black border mx-4" />
            <i className="fa-brands fa-apple text-2xl" />
          </div>

          <div className="flex gap-10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)} // Điều hướng khi click
                className="text-black font-normal text-xl leading-6"
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="flex gap-5 justify-end">
            <i className="fa-solid fa-magnifying-glass text-black text-xl" />
            <i className="fa-solid fa-bag-shopping text-black text-xl" />
            <i className="fa-regular fa-user text-black text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
