import React, { useEffect, useState, useCallback } from "react";
import CardPhone from "../../components/CardPhone";
import { ICategories } from "../../models/ICategories";
import { IProduct } from "../../models/IProduct";
import { FetchProductApi } from "../../apis/ProductApi";
import NotProduct from "../../components/NotProduct";

interface IProductRowProps {
  category: ICategories;
}

const ProductRow: React.FC<IProductRowProps> = ({ category }) => {
  const [categoryChildren, setCategoryChildren] = useState<number | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchProducts = useCallback(async () => {
    try {
      const fetchedProducts = await FetchProductApi(
        category.id,
        categoryChildren,
        sortOption,
        currentPage,
        itemsPerPage
      );
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [category.id, categoryChildren, sortOption, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChildrent = useCallback((id: number) => {
    setCategoryChildren(id);
    setCurrentPage(1); // Reset page when category changes
    console.log("Category Children:", id);
  }, []);

  const handleSort = (option: string) => {
    setSortOption(option);
    setIsOpen(false);
    setCurrentPage(1); // Reset page when sorting changes
  };

  const handleScroll = (direction: "left" | "right") => {
    setCurrentPage((prevPage) => {
      const newPage = direction === "right" ? prevPage + 1 : prevPage - 1;
      return Math.max(newPage, 1); // Ensure page number does not go below 1
    });
  };

  return (
    <div className="gap-10 rounded-xl py-2 px-4 md:px-28 flex flex-col w-full">
      <div className="justify-start md:flex-row flex-col flex">
        <h2 className="text-black text-3xl font-bold">{category.name}</h2>
        <p className="text-gray-500 text-3xl font-bold">
          {category.description}
        </p>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          {category.children?.map((childrenCate) => (
            <div
              key={childrenCate.id}
              className={`gap-2 rounded-lg border p-2 cursor-pointer ${
                categoryChildren === childrenCate.id ? "border-[#00B685]" : ""
              }`}
              onClick={() => handleChildrent(childrenCate.id)}
            >
              <p
                className={`font-normal text-xs ${
                  categoryChildren === childrenCate.id ? "text-[#00B685]" : ""
                }`}
              >
                {childrenCate.name}
              </p>
            </div>
          ))}
        </div>

        <div className="relative">
          <div
            className="flex justify-between rounded-3xl h-9 border w-40 px-3 items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <p>Lọc</p>
            <i className="fa-solid fa-circle-chevron-down"></i>
          </div>

          {isOpen && (
            <ul className="absolute top-full mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
              {["best-seller", "DESC", "ASC"].map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSort(option)}
                >
                  {option === "best-seller"
                    ? "Bán chạy nhất"
                    : option === "DESC"
                    ? "Gia tăng dần"
                    : "Giảm dần"}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center overflow-hidden">
        <button
          className="p-4 border rounded-full"
          onClick={() => handleScroll("left")}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        <div className="flex gap-2 columns-2">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <CardPhone key={product.id} product={product} />
            ))
          ) : (
            <NotProduct />
          )}
        </div>

        <button
          className="p-4 border rounded-full"
          onClick={() => handleScroll("right")}
          disabled={filteredProducts.length < itemsPerPage}
        >
          &gt;
        </button>
      </div>

      <div className="flex justify-center text-center">
        <p className="text-green-400 cursor-pointer">Xem toàn bộ &gt;&gt;</p>
      </div>
    </div>
  );
};

export default ProductRow;
