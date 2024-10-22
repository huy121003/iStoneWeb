import React, { useEffect, useState, useCallback } from "react";
import CardPhone from "../../components/CardPhone";
import { ICategories } from "../../models/ICategories";
import { IProduct } from "../../models/IProduct";
import { FetchProductApi } from "../../apis/ProductApi";
import NotProduct from "../../components/NotProduct";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Menu, message } from "antd";
import queryString from "query-string";

// Sử dụng React.memo để tránh render lại không cần thiết
const MemoizedCardPhone = React.memo(CardPhone);

interface IProductRowProps {
  category: ICategories;
}

const ProductRow: React.FC<IProductRowProps> = ({ category }) => {
  const [categoryId, setCategoryId] = useState<number>(category.id);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const query = queryString.stringify(
        {
          page: currentPage,
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
  }, [category.id, categoryId, sortOption, currentPage, keyword]);

  const handleCategoryChange = useCallback((id: number) => {
    setCategoryId(id);
    setCurrentPage(1); // Reset về trang đầu khi thay đổi danh mục
  }, []);

  const handleSort = (option: string) => {
    setSortOption(option);
    setCurrentPage(1); // Reset về trang đầu khi thay đổi sắp xếp
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
    setCurrentPage((prevPage) =>
      direction === "right" ? prevPage + 1 : Math.max(prevPage - 1, 1)
    );
  };

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/subpage/${categoryId}`);
  };

  return (
    <div className="gap-10 rounded-xl py-2 px-4 md:px-28 flex flex-col w-full">
      {/* Tiêu đề và mô tả */}
      <div className="flex flex-col md:flex-row justify-start mb-4">
        <h2 className="text-black text-3xl font-bold mr-[10px]">
          {category.name}
        </h2>
        <p className="text-gray-500 text-3xl font-bold">
          {category.description}
        </p>
      </div>

      {/* Danh mục con và tùy chọn sắp xếp */}
      <div className="flex justify-between items-center mb-4">
        {/* Danh mục con */}
        <div className="flex gap-4">
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

        {/* Menu sắp xếp */}
        <div className="hidden lg:flex">
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button>
              Lọc <i className="fa-solid fa-caret-down"></i>
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* Thẻ sản phẩm và phân trang */}
      <div className="flex justify-center items-center overflow-hidden relative">
        {currentPage > 1 && (
          <button
            className="absolute left-0 scroll-button border rounded-full w-[56px] h-[56px] p-2 bg-[#3C3C432E] hidden lg:flex items-center justify-center transition hover:bg-[#3C3C43BF]"
            onClick={() => handleScroll("left")}
          >
            <i className="fa-solid fa-chevron-left text-xl font-bold "></i>
          </button>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:gap-7">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <MemoizedCardPhone key={product.id} product={product} />
            ))
          ) : (
            <NotProduct />
          )}
        </div>

        {filteredProducts.length === itemsPerPage && (
          <button
            className="absolute right-0 scroll-button border rounded-full w-[56px] h-[56px] p-2 bg-[#3C3C432E] hidden lg:flex items-center justify-center transition hover:bg-[#3C3C43BF]"
            onClick={() => handleScroll("right")}
          >
            <i className="fa-solid fa-chevron-right text-xl font-bold"></i>
          </button>
        )}
      </div>

      {/* Liên kết xem toàn bộ */}
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
