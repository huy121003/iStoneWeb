import { useEffect, useState, useCallback, useMemo } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import ProductRow from "./ProductRow";
import { FetchCategoryApi } from "../../apis/CategoryApi";
import { ICategories } from "../../models/ICategories";
import { message } from "antd";
function HomePage() {
  const [categories, setCategories] = useState<ICategories[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const newCategories = await FetchCategoryApi();
      if(newCategories?.status&&newCategories.status>=400) message.error(newCategories.message)
      else setCategories(newCategories);
    };
    fetchCategories();
  }, []);

  const ads=[
      {
        icon: "fa-solid fa-truck",
        title: "Miễn phí vận chuyển",
        description: "Cho tất cả đơn trên 15 triệu VNĐ",
      },
      {
        icon: "fa-solid fa-hand-holding-dollar",
        title: "Thanh toán linh hoạt",
        description: "Thanh toán thuận tiện & an toàn 100%",
      },
      {
        icon: "fa-solid fa-headset",
        title: "24/7 hỗ trợ ngay",
        description: "Chuyên viên trực tổng đài 24/7",
      },
      {
        icon: "fa-solid fa-business-time",
        title: "Bảo hành & đổi trả dễ dàng",
        description: "Bảo hành lên đến 1 năm",
      },
    ]
  const banners =[
      {
        url: "../../../public/banner1.png",
      },
      {
        url: "../../../public/banner2.png",
      },
      {
        url: "../../../public/banner3.png",
      },
    ]
   

  return (
    <HomeLayout>
      <img
        src="../../../public/introduction.png"
        alt="Introduction"
        className="w-full h-auto mb-4"
      />
      <div className="py-2 px-4 md:px-10 lg:px-28">
        {/* Ads Section */}
        <div className="py-10 px-0 gap-5">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {ads.map((ad, index) => (
              <div
                key={index}
                className="flex flex-row md:flex-col px-5 border-l border-gray-300 first:border-l-0 md:first:border-l md:last:border-r-0"
              >
                <i
                  className={`${ad.icon} text-2xl text-gray-600 mb-2 mr-2 md:mb-4 md:mr-0`}
                ></i>
                <div>
                  <h3 className="text-lg font-semibold">{ad.title}</h3>
                  <p className="text-gray-500">{ad.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banner Section */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {banners.map((banner, index) => (
            <img
              src={banner.url}
              key={index}
              className="w-full md:w-1/3 h-auto object-cover"
              alt={`Banner ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Product Row Categories */}
      <div className="mt-8 justify-center items-center">
        {categories.map((category, index) => (
          <ProductRow key={index} category={category} />
        ))}
      </div>
    </HomeLayout>
  );
}

export default HomePage;
