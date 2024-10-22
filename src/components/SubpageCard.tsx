import React from "react";
import { IProduct } from "../models/IProduct";
import { useNavigate } from "react-router-dom";

interface SubpageCardProps {
  product: IProduct;
}

const SubpageCard: React.FC<SubpageCardProps> = ({ product }) => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Function to truncate the product name
  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  const handleProductClick = React.useCallback(() => {
    navigate(`/detail/${product.id}`);
    console.log("Product ID:", product.id);
  }, [navigate, product.id]);

  return (
    <div
      className="lg:w-auto w-auto h-[200px] md:h-[400px] rounded-md p-2 lg:gap-4 bg-white justify-center items-center shadow-md flex flex-col"
      onClick={handleProductClick}
    >
      <img
        src={product.images?.[0] || "default-image.jpg"}  // Kiểm tra hình ảnh
        alt={product.name || "No name available"}
        aria-label={`Image of ${product.name || "unknown product"}`}  // Tăng khả năng truy cập
        className="lg:w-full lg:h-48 w-[150px] h-[150px] object-cover"
      />
      <h3 className="lg:text-2xl  font-semibold">
        {truncateText(product.name, 20)}
      </h3>
      <div className="flex-1 md:flex gap-2 md:flex-wrap  hidden">
        {product?.attribute?.length ? (
          product.attribute.map((attr, index) => (
            <div
              key={index}
              className="rounded-md h-8 py-2 px-3 border border-slate-950 flex justify-center items-center"
            >
              <span className="text-sm text-black font-normal text-center">
                {attr.values[0]?.value || "N/A"}
              </span>
            </div>
          ))
        ) : (
          <span>No attributes available</span>  // Thêm thông báo nếu không có attribute
        )}
      </div>
    </div>
  );
};

export default SubpageCard;
