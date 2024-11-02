import React, { useEffect, useState, useCallback, useRef } from "react";
import CardPhone from "../../components/CardPhone";
import { ICategories } from "../../models/ICategories";
import { IProduct } from "../../models/IProduct";
import { FetchProductApi } from "../../apis/ProductApi";
import NotProduct from "../../components/NotProduct";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Menu, message } from "antd";
import queryString from "query-string";

const MemoizedCardPhone = React.memo(CardPhone);

interface IProductRowProps {
  category: ICategories;
}

const ProductRow: React.FC<IProductRowProps> = ({ category }) => {
  const [categoryId, setCategoryId] = useState<number>(category.id);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [sortOption, setSortOption] = useState("");
  const [keyword, setKeyword] = useState<string>("");
  const itemsPerPage = 20;
  const navigate = useNavigate();
  const productContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = queryString.stringify(
        {
          categoryId: categoryId,
          order: sortOption,
          take: itemsPerPage,
          keyword: keyword,
        },
        { skipNull: true, skipEmptyString: true }
      );

      const res = await FetchProductApi(query);

      if (res?.status && res.status >= 400) {
        message.error(res.message);
      } else {
        setProducts(res.data);
        setFilteredProducts(res.data);
      }
    };

    fetchProducts();
  }, [category.id, categoryId, sortOption, keyword]);

  const handleCategoryChange = useCallback((id: number) => {
    setCategoryId(id);
  }, []);

  const handleSort = (option: string) => {
    setSortOption(option);
  };

  const sortOptions = [
    { label: "Giá giảm dần", value: "DESC" },
    { label: "Giá tăng dần", value: "ASC" },
  ];

  const menu = (
    <Menu onClick={(e) => handleSort(e.key)}>
      {sortOptions.map((option) => (
        <Menu.Item key={option.value}>{option.label}</Menu.Item>
      ))}
    </Menu>
  );

  const handleScroll = (direction: "left" | "right") => {
    if (productContainerRef.current) {
      const scrollAmount = 300; // Độ dài cuộn
      productContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/subpage/${categoryId}`);
  };

  return (
    <div className="gap-10 rounded-xl py-2 px-4 lg:px-28 flex flex-col w-full overflow-hidden">
      <div className="flex flex-col md:flex-row justify-start mb-4">
        <h2 className="text-black text-3xl font-bold mr-[10px]">
          {category.name}
        </h2>
        <p className="text-gray-500 text-3xl font-bold">
          {category.description}
        </p>
      </div>

      <div className="flex justify-between items-center mb-4 flex-1">
        <div className="flex gap-4 flex-1 mr-4">
          {category.children?.map((child) => (
            <div
              key={child.id}
              className={`rounded-lg border p-2 cursor-pointer transition-colors duration-300 flex-1 ${
                categoryId === child.id
                  ? "border-[#00B685] bg-[#E6F8F1]"
                  : "border-gray-200"
              }`}
              onClick={() => handleCategoryChange(child.id)}
            >
              <p
                className={`font-normal lg:text-xl text-sm ${
                  categoryId === child.id
                    ? "text-[#00B685] font-bold"
                    : "text-gray-700"
                }`}
              >
                {child.name}
              </p>
            </div>
          ))}
        </div>
        <div className="lg:flex-1 hidden " />

        <div className="hidden lg:flex">
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button>
              Lọc <i className="fa-solid fa-caret-down"></i>
            </Button>
          </Dropdown>
        </div>
      </div>

      <div className="relative flex justify-center items-center overflow-hidden">
        <button
          className="absolute left-0 z-10 scroll-button border rounded-full w-[56px] h-[56px] p-2 bg-[#3C3C432E] hidden lg:flex items-center justify-center transition hover:bg-[#3C3C43BF]"
          onClick={() => handleScroll("left")}
        >
          <i className="fa-solid fa-chevron-left text-xl font-bold"></i>
        </button>

        <div
          ref={productContainerRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:gap-2 overflow-hidden max-w-full"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="lg:w-[350px] justify-center items-center">
                <MemoizedCardPhone key={product.id} product={product} />
              </div>
            ))
          ) : (
            <NotProduct />
          )}
        </div>

        <button
          className="absolute right-0 z-10 scroll-button border rounded-full w-[56px] h-[56px] p-2 bg-[#3C3C432E] hidden lg:flex items-center justify-center transition hover:bg-[#3C3C43BF]"
          onClick={() => handleScroll("right")}
        >
          <i className="fa-solid fa-chevron-right text-xl font-bold"></i>
        </button>
      </div>

      <div className="flex justify-center text-center mt-4">
        <p
          className="text-green-400 cursor-pointer hover:underline"
          onClick={() => handleCategoryClick(category.id)}
        >
          Xem toàn bộ &gt;&gt;
        </p>
      </div>
    </div>
  );
};

export default ProductRow;
