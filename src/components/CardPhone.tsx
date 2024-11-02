import React, { useState } from "react";
import { IProduct } from "../models/IProduct";
import { useNavigate } from "react-router-dom";

interface CardPhoneProps {
  product: IProduct;
}

const CardPhone: React.FC<CardPhoneProps> = ({ product }) => {
  const [numberColor, setNumberColor] = useState<number>(0);

  const navigate = useNavigate(); // Khởi tạo useNavigate
  const handleProductClick = () => {
    navigate(`/detail/${product.id}`);
  
  };
  return (
    <div className=" lg:w-[220px] lg:h-[340px] xl:w-[330px] xl:h-[450px] md:w-[170px] w-[140px] h-[250px] p-5 rounded-lg shadow-md flex flex-col items-center my-4 mx-2">
      {/* Product ID */}
      <p className="text-orange-500 font-medium text-base self-start hidden lg:flex">
        Hot
      </p>

      {/* Product Image */}
      <img
        src={product.images[numberColor]}
        className="ld:w-[200px] lg:h-[200px] w-[150px] h=[150px] object-cover my-4  "
        alt="Phone"
        onClick={handleProductClick}
      />

      {/* Color Options */}
      <div className="flex lg:gap-2 gap-1 ">
        {Array.isArray(product.attribute) &&
          product.attribute.length > 0 &&
          product?.attribute[0]?.values?.map((value, index) => (
            <div
              key={index}
              className={`h-6 w-6 rounded-full justify-center items-center flex ${
                index === numberColor ? "border-2 border-[#00B685]" : ""
              }`}
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
        <p className="font-semibold lg:text-lg text-sm">
          {product.name.length > 20
            ? product.name.substring(0, 20) + "..."
            : product.name}
        </p>
      </div>
      <div className="flex-1" />
      {/* Price Display */}
      <div className="flex space-x-2 lg:items-center justify-start">
        <p className="text-blue-500 font-bold  lg:text-lg text-sm">
          {product.price.toLocaleString()}đ
        </p>
      </div>
    </div>
  );
};

export default CardPhone;
