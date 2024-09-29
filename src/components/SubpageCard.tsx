import React from "react";
import { IProduct } from "../models/IProduct";
import { useNavigate } from "react-router-dom";

interface SubpageCardProps {
  product: IProduct;
}

const SubpageCard: React.FC<SubpageCardProps> = ({ product }) => {
  // Function to truncate the product name
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const handleProductClick = () => {
    navigate(`/detail/${product.id}`);
    console.log("Product ID:", product.id);
  };
  return (
    <div
      className="w-[304px] rounded-md py-4 px-8 gap-4 bg-white justify-center items-center shadow-md flex flex-col"
      onClick={handleProductClick}
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <h3 className="text-2xl font-semibold">
        {truncateText(product.name, 20)} {/* Adjust the max length as needed */}
      </h3>
      <div className="flex-1 flex gap-2 flex-wrap">
        {product?.attribute?.map((attr, index) => (
          <div
            key={index}
            className="rounded-md h-8 py-2 px-3 border border-slate-950 flex justify-center items-center"
          >
            <span className="text-sm text-black font-normal text-center">
              {attr.values[0]?.value || "N/A"}{" "}
              {/* Safeguard against undefined values */}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubpageCard;
