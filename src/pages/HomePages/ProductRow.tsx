import React, { useEffect, useState, useCallback } from "react";
import CardPhone from "../../components/CardPhone";
import { ICategories } from "../../models/ICategories";
import { IProduct } from "../../models/IProduct";
import { FetchProductApi } from "../../apis/ProductApi";
import NotProduct from "../../components/NotProduct";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

// Memoize CardPhone to avoid unnecessary re-renders
const MemoizedCardPhone = React.memo(CardPhone);

interface IProductRowProps {
  category: ICategories;
}

const ProductRow: React.FC<IProductRowProps> = ({ category }) => {
  const [state, setState] = useState({
    categoryChildren: null as number | null,
    products: [] as IProduct[],
    filteredProducts: [] as IProduct[],
    sortOption: "",
    currentPage: 1,
    isOpen: false,
  });
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    const fetchedProducts = await FetchProductApi(
      category.id,
      state.categoryChildren,
      state.sortOption,
      state.currentPage,
      itemsPerPage
    );
    if(fetchedProducts?.status&&fetchedProducts.status>=400) message.error(fetchedProducts.message)
    setState((prevState) => ({
      ...prevState,
      products: fetchedProducts,
      filteredProducts: fetchedProducts,
    }));
  }, [
    category.id,
    state.categoryChildren,
    state.sortOption,
    state.currentPage,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChildren = useCallback((id: number) => {
    setState((prevState) => ({
      ...prevState,
      categoryChildren: id,
      currentPage: 1, // Reset page when category changes
    }));
  }, []);

  const handleSort = (option: string) => {
    setState((prevState) => ({
      ...prevState,
      sortOption: option,
      isOpen: false,
      currentPage: 1, // Reset page when sorting changes
    }));
  };

  const handleScroll = (direction: "left" | "right") => {
    setState((prevState) => {
      const newPage =
        direction === "right"
          ? prevState.currentPage + 1
          : prevState.currentPage - 1;
      return { ...prevState, currentPage: Math.max(newPage, 1) };
    });
  };

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/subpage/${categoryId}`);
  };

  const { filteredProducts, currentPage, isOpen } = state;

  return (
    <div className="gap-10 rounded-xl py-2 px-4 md:px-28 flex flex-col w-full">
      {/* Title and Description */}
      <div className="justify-start md:flex-row flex-col flex mb-4">
        <h2 className="text-black text-3xl font-bold">{category.name}</h2>
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
                state.categoryChildren === childrenCate.id
                  ? "border-[#00B685] bg-[#E6F8F1]"
                  : "border-gray-200"
              }`}
              onClick={() => handleCategoryChildren(childrenCate.id)}
            >
              <p
                className={`font-normal text-xl ${
                  state.categoryChildren === childrenCate.id
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
        <div className="">
          <div
            className="flex justify-between rounded-3xl h-9 border w-40 px-3 items-center cursor-pointer"
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                isOpen: !prevState.isOpen,
              }))
            }
          >
            <p>Lọc</p>
            <i className="fa-solid fa-circle-chevron-down"></i>
          </div>

          {isOpen && (
            <ul className=" top-full mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
              {["best-seller", "DESC", "ASC"].map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
                  onClick={() => handleSort(option)}
                >
                  {option === "best-seller"
                    ? "Bán chạy nhất"
                    : option === "DESC"
                    ? "Giá giảm dần"
                    : "Giá tăng dần"}
                </li>
              ))}
            </ul>
          )}
        </div>
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
