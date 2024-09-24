import HomeLayout from "../../layouts/HomeLayout";


function HomePage() {
  //quang cao
  const ads = [
    {
      icon: "fa-solid fa-truck",
      title: "Miễn phí vẫn chuyển",
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
  const banner = [
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

  return (
    <HomeLayout>
       <img src="../../../public/introduction.png" alt="Introduction" />
      <div className="py-2 px-28 flex-row">
        <div className="py-10 px-0 gap-5">
          <div className="flex  justify-between ">
            {ads.map((ad, index) => (
              <div
                key={index}
                className={` flex flex-row  px-5 border-l border-gray-300 first:border-l-0 last:border-r-0 justify-start`}
              >
                <i className={`${ad.icon} text-2xl text-gray-600 mb-2 mr-2 justify-center`}></i>
                <div>
                <h3 className="text-lg font-semibold">{ad.title}</h3>
                <p className="text-gray-500">{ad.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-between">
          {banner.map((banner, index) => (
            <img src={banner.url} key={index} />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;
