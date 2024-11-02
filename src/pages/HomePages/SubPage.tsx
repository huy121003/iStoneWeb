import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchProductApi } from "../../apis/ProductApi";
import { IProduct } from "../../models/IProduct";
import { FetchCategoryApi } from "../../apis/CategoryApi";
import { ICategories } from "../../models/ICategories";
import SubpageCard from "../../components/SubpageCard";
import { Button, Dropdown, Menu, message } from "antd";
import queryString from "query-string";

function SubPage() {
  const { categoryId } = useParams();
  const [categoryID, setCategoryID] = useState<number>(Number(categoryId));
  const [products, setProducts] = useState<IProduct[]>([]);
  const [category, setCategory] = useState<ICategories | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setCategoryID(Number(categoryId));
  }, [categoryId]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (categoryID) {
        const stringQuery = queryString.stringify(
          {
            page: currentPage,
            categoryId: categoryID,
            order: sortOption,
            take: pageSize,
          },
          { skipNull: true, skipEmptyString: true }
        );

        const fetchedProducts = await FetchProductApi(stringQuery);
        if (fetchedProducts?.status && fetchedProducts.status >= 400) {
          setError(fetchedProducts.message);
        } else {
          setProducts(fetchedProducts.data);
        }
      }
    };

    const fetchCategory = async () => {
      if (categoryId) {
        try {
          const allCategories = await FetchCategoryApi();
          const matchedCategory = allCategories.find(
            (category: ICategories) => category.id === Number(categoryId)
          );
          if (matchedCategory) {
            setCategory(matchedCategory);
          } else {
            message.error("Không tìm thấy danh mục.");
          }
        } catch (error) {
          message.error("Có lỗi xảy ra khi tải danh mục.");
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
  }, [categoryId, pageSize, sortOption, currentPage, categoryID]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setPageSize((prevSize) => prevSize + 20);
    setIsLoadingMore(false);
  };

  const handleCategoryChildren = useCallback((id: number) => {
    setCategoryID(id);
    setCurrentPage(1);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 mt-[96px]">{error}</div>;
  }

  const sortOptions = [
    { label: "Giá giảm dần", value: "DESC" },
    { label: "Giá tăng dần", value: "ASC" },
  ];

  const handleSort = (option: string) => {
    setSortOption(option);
    setCurrentPage(1); // Reset to the first page when sorting changes
  };

  const menu = (
    <Menu onClick={(e) => handleSort(e.key)}>
      {sortOptions.map((option) => (
        <Menu.Item key={option.value}>{option.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="container mx-auto p-4 mt-[96px]">
      <div className="flex justify-between items-center mb-4">
        <div>
          {category && (
            <h2 className="text-3xl font-bold text-[#00B685]">
              {category.name}
            </h2>
          )}
        </div>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button>
            Lọc <i className="fa-solid fa-caret-down"></i>
          </Button>
        </Dropdown>
      </div>

      {/* Category Children Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {category?.children?.map((childrenCate) => (
          <div
            key={childrenCate.id}
            className={`rounded-lg border p-2 cursor-pointer transition-colors duration-300 ${
              categoryID === childrenCate.id
                ? "border-[#00B685] bg-[#E6F8F1]"
                : "border-gray-200"
            }`}
            onClick={() => handleCategoryChildren(childrenCate.id)}
          >
            <p
              className={`font-normal text-xl ${
                categoryID === childrenCate.id
                  ? "text-[#00B685] font-bold"
                  : "text-gray-700"
              }`}
            >
              {childrenCate.name}
            </p>
          </div>
        ))}
      </div>

      {/* Product Grid */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-10 md:gap-6 gap-4 mt-4">
        {products.length ? (
          products.map((product) => (
            <SubpageCard key={product.id} product={product} />
          ))
        ) : (
          <li className="col-span-full text-center">Không có sản phẩm nào.</li>
        )}
      </ul>

      {/* Load More Button */}
      {products.length >= pageSize && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-[#00B685] text-white px-4 py-2 rounded-3xl"
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
