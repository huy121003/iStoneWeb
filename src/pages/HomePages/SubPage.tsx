import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchProductApi } from "../../apis/ProductApi";
import { IProduct } from "../../models/IProduct";
import { FetchCategoryApi } from "../../apis/CategoryApi";
import { ICategories } from "../../models/ICategories";
import SubpageCard from "../../components/SubpageCard";
import { message } from "antd";

function SubPage() {
  const { categoryId } = useParams(); // Lấy categoryId từ URL
  const [products, setProducts] = useState<IProduct[]>([]);
  const [category, setCategory] = useState<ICategories | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(20); // Kích thước ban đầu là 20 sản phẩm
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchText, setSearchText] = useState(""); // Trạng thái cho tìm kiếm
  const [sortOption, setSortOption] = useState("Bán chạy nhất"); // Trạng thái cho sắp xếp

  useEffect(() => {
    const fetchProducts = async () => {
      if (categoryId) {
        const fetchedProducts = await FetchProductApi(
          Number(categoryId),
          null,
          "",
          1,
          pageSize,
          searchText
        );

        if (sortOption === "Giá thấp nhất") {
          fetchedProducts.sort((a: IProduct, b: IProduct) => a.price - b.price);
        } else if (sortOption === "Giá cao nhất") {
          fetchedProducts.sort((a: IProduct, b: IProduct) => b.price - a.price);
        }
        if (fetchedProducts?.status && fetchedProducts.status >= 400)
          message.error(fetchedProducts.message);
        else setProducts(fetchedProducts);
      }
    };

    const fetchCategory = async () => {
      if (categoryId) {
        try {
          const allCategories = await FetchCategoryApi(); // Giả sử gọi tất cả categories
          const matchedCategory = allCategories.find(
            (category: ICategories) => category.id === Number(categoryId)
          );
          if (matchedCategory) {
            setCategory(matchedCategory);
          } else {
            setError("Category not found.");
          }
        } catch (error) {
          console.error("Error fetching category:", error);
          setError("Failed to fetch category.");
        }
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await fetchCategory();
      await fetchProducts();
      setLoading(false);
    };

    fetchData();
  }, [categoryId, pageSize, searchText, sortOption]); // Khi pageSize, searchText hoặc sortOption thay đổi, gọi lại API

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setPageSize((prevSize) => prevSize + 20); // Tăng kích thước page lên 20 mỗi lần
    setIsLoadingMore(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 mt-[96px]">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-[96px]">
      <div className="flex flex-1 justify-center items-center">
        {" "}
        <div className=" flex-1">
          {category && (
            <div className="flex-1 flex">
              <img
                src={category.icon}
                alt={category.name}
                className="w-24 h-24 mb-4"
              />
              <h2 className="text-3xl font-bold text-[#00B685]">
                {category.name}
              </h2>
            </div>
          )}
        </div>
        <div className="flex mb-6 justify-between items-center">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Nhập từ khóa tìm kiếm..."
            className="border rounded-lg p-2 flex-1 mr-4"
          />

          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded-lg p-2"
            >
              <option value="Bán chạy nhất">Bán chạy nhất</option>
              <option value="Giá thấp nhất">Giá thấp nhất</option>
              <option value="Giá cao nhất">Giá cao nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Thanh tìm kiếm và dropdown sắp xếp */}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 ">
        {products.length ? (
          products.map((product) => (
            <SubpageCard key={product.id} product={product} />
          ))
        ) : (
          <li className="col-span-full text-center">No products found.</li>
        )}
      </ul>

      {/* Load More Button */}
      {products.length >= pageSize && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-[#00B685] text-white px-4 py-2 rounded-3xl "
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Xem thêm"}
          </button>
        </div>
      )}
    </div>
  );
}

export default SubPage;
