import React, { useState } from "react";
import { IProduct } from "../models/IProduct";
import { useNavigate } from "react-router-dom";

interface CardPhoneProps {
  product: IProduct;
}

const CardPhone: React.FC<CardPhoneProps> = ({ product }) => {
  const [numberColor, setNumberColor] = useState<number>(0);
  console.log("Product:",  product?.attribute[0]?.values);
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const handleProductClick = () => {
    navigate(`/detail/${product.id}`);
    console.log("Product ID:", product.id);
  };
  return (
    <div className="w-[304px] h-[432px] p-5 rounded-lg shadow-md flex flex-col items-center">
      {/* Product ID */}
      <p className="text-orange-500 font-medium text-base self-start">
      Hot
      </p>

      {/* Product Image */}
      <img
        src={product.images[numberColor]}
        className="w-[244px] h-[244px] object-cover my-4  "
        alt="Phone"
        onClick={handleProductClick}
      />

      {/* Color Options */}
      <div className="flex gap-2">
        {Array.isArray(product.attribute) &&
          product.attribute.length > 0 &&
          product?.attribute[0]?.values?.map((value, index) => (
            <div
              key={index}
              className={`h-6 w-6 rounded-full justify-center items-center flex ${index === numberColor ? 'border-2 border-blue-500' : ''}`}
              onClick={() => setNumberColor(index)}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: value.html_color }}
              />
            </div>
          ))}
      </div>

      {/* Product Name */}
      <div className="text-center mb-1">
        <p className="font-semibold text-lg">{product.name}</p>
      </div>

      {/* Price Display */}
      <div className="flex space-x-2 items-center">
        <p className="text-gray-500 line-through">
          {product.price.toLocaleString()}đ
        </p>
        <p className="text-blue-500 font-bold text-lg">
          {product.salePrice.toLocaleString()}đ
        </p>
      </div>
    </div>
  );
};

export default CardPhone;
