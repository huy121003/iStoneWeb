import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IProduct } from "../../models/IProduct";
import { FetchProductDetailApi } from "../../apis/ProductApi";

const DetailPage: React.FC = () => {
  const { productId } = useParams();
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: number | null }>({});
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const response = await FetchProductDetailApi(Number(productId));
          setProduct(response);
        } else {
          console.error("Product ID is undefined");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAttributeClick = (attrName: string, index: number) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attrName]: index,
    }));
  };

  return (
    <div className="flex-1 flex-row - p-4 bg-gray-100 mt-[96px]">
      {/* Left Section: Product Image */}
      <div className="flex flex-1">
        <i className="fa-solid fa-home text-black" />
        {product && (
          <>
            <p className="text-black font-2xl">{product.category1?.name} {">"}</p>
            <p className="text-black font-2xl">{product.category2?.name} {">"}</p>
            <p className="text-black font-2xl">{product.name}</p>
          </>
        )}
      </div>
      <div className="flex-1 flex">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={product?.images[0]} // Replace with the actual image URL
            alt={product?.name}
            className="w-full h-auto max-w-md"
          />
        </div>
        <div className="">
          <h2 className="text-2xl font-bold">{product?.name}</h2>
          <div className="border flex-1 my-2 border-slate-800" />
          <div>
            {product?.attribute?.map((attr, attrIndex) => (
              <div key={attrIndex} className="flex-1 gap-2 ">
                <p className="text-xl font-semibold my-4">{attr.name}</p>
                <div className="flex">
                  {attr.values.map((value, index) => (
                    <div
                      key={index}
                      className={`border p-4 gap-2 ${selectedAttributes[attr.name] === index ? "border-green-400" : "border-gray-400"} rounded-xl mx-1`}
                      onClick={() => handleAttributeClick(attr.name, index)}
                    >
                      <p className="text-lg font-normal">{value.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="justify-end flex-1 flex">
        <div className="justify-center items-center">
          <h2 className="text-2xl font-bold my-4">
            {product?.salePrice?.toLocaleString()} đ
          </h2>
        </div>
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
