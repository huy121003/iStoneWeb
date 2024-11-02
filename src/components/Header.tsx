import { useEffect, useState } from "react";
import { Button, Drawer, message } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FetchCategoryApi } from "../apis/CategoryApi";
import { ICategories } from "../models/ICategories";

function Header() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [categories, setCategories] = useState<ICategories[]>([]);
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const handleCategoryClick = (categoryId: number) => {
    // Điều hướng đến trang SubPage với categoryId trong URL
 
    navigate(`/subpage/${categoryId}`);
    onClose();
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const newCategories = await FetchCategoryApi();
   
      if (!newCategories.message) {
        setCategories(newCategories);
      } else message.error(newCategories.message);
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex-1 flex-col  z-50 fixed">
      <div className="flex-1  fixed w-full">
        <div className="lg:flex justify-between h-10 py-2 lg:px-28 px-4 bg-slate-800 hidden">
          <div className="flex justify-between w-72">
            <p className="text-white font-normal text-sm leading-6">
              iStone for Education
            </p>
            <p className="text-white font-normal text-sm leading-6">
              iStone for Enterprise
            </p>
          </div>
          <div className="flex gap-5 justify-end">
            <p className="text-white hover:text-blue-700 text-sm">Đăng nhập</p>
            <p className="text-white hover:text-blue-700 text-sm">Đăng kí</p>
          </div>
        </div>

        {/* Thanh menu chính */}
        <div className="flex justify-between items-center bg-white h-14 py-2 lg:px-28 px-4">
          <div className="flex items-center" onClick={() => navigate("/")}>
            <img src="/logo.png" alt="logo" className="w-6 h-6" />
            <p className="text-black font-bold text-2xl">
              <i className="text-emerald-500">i</i>Stone
            </p>
            <div className="h-7 border-black border mx-4 hidden lg:inline" />
            <i className="fa-brands fa-apple text-2xl hidden md:inline" />
          </div>

          <div className="hidden lg:flex lg:gap-6 md:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="text-black font-normal text-xl leading-6 hover:border-b-2 hover:border-blue-700"
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="hidden lg:flex-1 lg:fex" />
          <div className="lg:hidden">
            <Button
              type="primary"
              shape="circle"
              onClick={showDrawer}
              className="bg-gray-400"
            >
              <i className="fa-solid fa-bars" />
            </Button>
            <Drawer onClose={onClose} open={open}>
              <div>
                <p className="text-black font-normal text-xl leading-6 my-4">
                  iStone for Education
                </p>
                <p className="text-black font-normal text-xl leading-6 mb-[60px]">
                  iStone for Enterprise
                </p>
              </div>
              <div className="mb-[60px]">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className="text-black font-normal text-xl leading-6 hover:text-blue-700 flex my-4"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <p
                className="text-black font-normal text-xl leading-6 mb-[60px]"
                onClick={() => {
                  navigate("/cart");
                  onClose();
                }}
              >
                Giỏ hàng
              </p>
              <p className="text-black font-normal text-xl leading-6 my-4">
                Đăng nhập
              </p>
              <p className="text-black font-normal text-xl leading-6 my-4">
                Đăng kí mới
              </p>
            </Drawer>
          </div>
          <div className="hidden lg:flex gap-5 justify-end">
            <i className="fa-solid fa-magnifying-glass text-black text-xl" />
            <i
              className="fa-solid fa-bag-shopping text-black text-xl"
              onClick={() => navigate("/cart")}
            />
            <i className="fa-regular fa-user text-black text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
