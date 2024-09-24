function Header() {
  const categories = [
    {
      name: "Mac",
      url: "/",
    },
    {
      name: "iPad",
      url: "/",
    },
    {
      name: "iPhone",
      url: "/",
    },
    {
      name: "Watch",
      url: "/",
    },
    {
      name: "Máy In",
      url: "/",
    },
    {
      name: "Phụ Kiện",
      url: "/",
    },
    {
      name: "Hỗ trợ",
      url: "/",
    },
  ];
  return (
    <div className="flex-1 flex-row  h-24">
      <div className=" flex justify-between h-10 py-2 px-28 bg-slate-800">
        <div className=" flex justify-between w-72 ">
          <p className="text-white font-normal text-sm leading-6">
            iStone for Education
          </p>
          <p className="text-white font-normal text-sm leading-6">
            iStone for Enterprise
          </p>
        </div>
        <div className="flex-1" />
        <div className=" flex  gap-5 justify-end">
          <i className="fa-solid fa-magnifying-glass text-white size-6" />
          <i className="fa-solid fa-bag-shopping text-white size-6" />
          <i className="fa-regular fa-user text-white size-6" />
        </div>
      </div>
      <div className="  flex justify-between bg-white h-14 py-2 px-28 ">
        <div className="flex">
          <img src="../../public/logo.png" alt="logo" className="w-6 h-6" />
          <p className="text-black font-bold text-2xl">
            <i className="text-emerald-500 not-italic">i</i>Stone
          </p>
          <div className="h-7 border-black  border mx-4" />
          <i className="fa-brands fa-apple text-2xl size-7"></i>
        </div>
        <div className="flex gap-10">
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.url}
              className="text-black font-normal text-xl leading-6"
            >
              {category.name}
            </a>
          ))}
        </div>
        <div className="flex  gap-5 justify-end">
          <i className="fa-solid fa-magnifying-glass text-black size-6" />
          <i className="fa-solid fa-bag-shopping text-black size-6" />
          <i className="fa-regular fa-user text-black size-6" />
        </div>
      </div>
    </div>
  );
}
export default Header;
