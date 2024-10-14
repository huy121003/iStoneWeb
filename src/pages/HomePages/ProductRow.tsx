import React, { useEffect, useState, useCallback } from "react";
import CardPhone from "../../components/CardPhone";
import { ICategories } from "../../models/ICategories";
import { IProduct } from "../../models/IProduct";
import { FetchProductApi } from "../../apis/ProductApi";
import NotProduct from "../../components/NotProduct";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Menu, message } from "antd";
import queryString from "query-string";
import DropdownButton from "antd/es/dropdown/dropdown-button";

// Memoize CardPhone to avoid unnecessary re-renders
const MemoizedCardPhone = React.memo(CardPhone);

interface IProductRowProps {
  category: ICategories;
}

const ProductRow: React.FC<IProductRowProps> = ({ category }) => {
  // State specific to each ProductRow
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
      // Create query string dynamically, skipping null/empty values

      const stringQuery = queryString.stringify(
        {
          page: currentPage,
          categoryId: categoryId,
          //category1Id: categoryChildren,
          //categoryChildren: categoryChildren,
          order: sortOption,

          take: itemsPerPage,
          keyword: keyword,
        },
        { skipNull: true, skipEmptyString: true }
      );

      console.log("Query:", stringQuery);

      const res = await FetchProductApi(stringQuery);

      if (res?.status && res.status >= 400) {
        message.error(res.message);
      } else {
        setProducts(res.data);
        setFilteredProducts(res.data); // Copy the fetched products to filteredProducts
      }
    };

    fetchProducts();
  }, [category.id, categoryId, sortOption, currentPage]);

  const handleCategoryChildren = useCallback((id: number, keyword: string) => {
    //setKeyword(keyword);
    setCategoryId(id);
    setCurrentPage(1); // Reset to the first page when category changes
  }, []);

  const handleSort = (option: string) => {
    setSortOption(option);
    // Close the dropdown after selecting a sort option
    setCurrentPage(1); // Reset to the first page when sorting changes
  };
  const sortOptions = [
    //{ label: 'Bán chạy nhất', value: 'best-seller' },
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
      {/* Title and Description */}
      <div className="justify-start md:flex-row flex-col flex mb-4">
        <h2 className="text-black text-3xl font-bold mr-[10px]">
          {category.name}
        </h2>
        <p className="text-gray-500 text-3xl font-bold">
          {category.description}
        </p>
      </div>

      {/* Children Categories & Sorting Options */}
      <div className="flex justify-between items-center mb-4">
        {/* Children Categories */}
        <div className="flex gap-2">
          {category.children?.map((childrenCate) => (
            <div
              key={childrenCate.id}
              className={`gap-2 rounded-lg border p-2 cursor-pointer transition-colors duration-300 ${
                categoryId === childrenCate.id
                  ? "border-[#00B685] bg-[#E6F8F1]"
                  : "border-gray-200"
              }`}
              onClick={() =>
                handleCategoryChildren(childrenCate.id, childrenCate.name)
              }
            >
              <p
                className={`font-normal text-xl ${
                  categoryId === childrenCate.id
                    ? "text-[#00B685] font-bold"
                    : "text-gray-700"
                }`}
              >
                {childrenCate.name}
              </p>
            </div>
          ))}
        </div>

        {/* Sorting Menu */}

        <Dropdown overlay={menu} trigger={["click"]}>
          <Button>
            Lọc <i className="fa-solid fa-caret-down"></i>
          </Button>
        </Dropdown>
      </div>

      {/* Product Cards & Pagination */}
      <div className="flex justify-center items-center overflow-hidden relative">
        {currentPage > 1 && (
          <button
            className="absolute left-0 border rounded-full w-[56px] h-[56px] p-2 bg-[#3C3C432E]"
            onClick={() => handleScroll("left")}
          >
            <i className="fa-solid fa-chevron-left text-xl font-bold"></i>
          </button>
        )}

        <div className="flex gap-7">
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
            className="absolute right-0 border rounded-full w-[56px] h-[56px] p-2 bg-[#3C3C432E]"
            onClick={() => handleScroll("right")}
          >
            <i className="fa-solid fa-chevron-right text-xl font-bold"></i>
          </button>
        )}
      </div>

      {/* View All Link */}
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
