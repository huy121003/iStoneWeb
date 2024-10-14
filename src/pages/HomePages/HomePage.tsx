import React, { useEffect, useState, useCallback, useMemo } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import ProductRow from "./ProductRow";
import { FetchCategoryApi } from "../../apis/CategoryApi";
import { ICategories } from "../../models/ICategories";
import { Carousel, Button, message } from "antd";
import { IBanners } from "../../models/IBanners";
import { FetchBannerApi } from "../../apis/BannerApi";
function HomePage() {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [babbers, setBanners] = useState<IBanners[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const newCategories = await FetchCategoryApi();

      if (!newCategories.message) {
        setCategories(newCategories);
      } else message.error(newCategories.message);
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const fethcBanner = async () => {
      const res = await FetchBannerApi();
      console.log("deded", res);
      if (!res.message) {
        setBanners(res);
      } else message.error(res.message);
    };
    fethcBanner();
  }, []);
  const ads = [
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
  ];
  const banners = [
    {
      url: "../../../public/banner1.png",
    },
    {
      url: "../../../public/banner2.png",
    },
    {
      url: "../../../public/banner3.png",
    },
  ];
  const carouselRef = React.useRef<any>(null);

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const handlePrev = () => {
    carouselRef.current?.prev();
  };
  return (
    <HomeLayout>
      <div className="relative  ">
        <Carousel autoplay ref={carouselRef} className="w-full ">
          {banners.map((banner, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={banner.url}
                alt={`Banner ${index + 1}`}
                className="w-full  object-cover object-center"
              />
            </div>
          ))}
        </Carousel>

        {/* Nút điều hướng */}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-4 hidden md:flex">
          <Button
            onClick={handlePrev}
            className="bg-gray-800 text-white border rounded-full w-[56px] h-[56px] p-2 bg-[#3C3C432E]"
          >
            <i className="fa-solid fa-chevron-left text-xl font-bold"></i>
          </Button>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-4 hidden md:flex">
          <Button
            onClick={handleNext}
            className="bg-gray-800 text-white border rounded-full w-[56px] h-[56px] p-2 bg-[#3C3C432E]"
          >
            <i className="fa-solid fa-chevron-right text-xl font-bold"></i>
          </Button>
        </div>
      </div>
      <div className="py-2 px-4 md:px-10 lg:px-28">
        {/* Ads Section */}
        <div className="py-10 px-0 gap-5">
          <div className="flex flex-col md:flex-row justify-between ">
            {ads.map((ad, index) => (
              <div
                key={index}
                className="flex flex-row md:flex-col px-10 border-l border-gray-300 first:border-l-0 md:first:border-l md:last:border-r-0"
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
