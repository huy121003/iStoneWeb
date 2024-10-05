import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IProduct } from "../../models/IProduct";
import { FetchProductDetailApi } from "../../apis/ProductApi";
import { message } from "antd";

const DetailPage: React.FC = () => {
  const { productId } = useParams();
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: number | null;
  }>({});
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const fetchProduct = async () => {
   
        const response = await FetchProductDetailApi(Number(productId));
        if(response?.status&&response.status>=400) message.error(response.message)
        else setProduct(response);
     
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
    <div className="flex-1 flex-row -  bg-[#FFFFFF] mt-[96px] ">
      {/* Left Section: Product Image */}
      <div className="flex flex-1 justify-start items-center gap-2  px-4 md:px-10 lg:px-28 py-8">
        <i className="fa-solid fa-home text-black" />
        {product && (
          <>
            <p className="text-black font-2xl">
            {product.category1!==null&& `${product.category1.name} >`}
            </p>
            <p className="text-black font-2xl">
              {product.category2!==null&& `${product.category2.name} >`}
            </p>
            <p className="text-green-400 font-2xl ">{product.name}</p>
          </>
        )}
      </div>
      <div className="h-[100px]"></div>
      <div className="flex-1 flex  px-4 md:px-10 lg:px-28 ">
        <div className="md:w-1/2 flex justify-center items-center ">
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
                      className={`border p-4 gap-2 ${
                        selectedAttributes[attr.name] === index
                          ? "border-green-400  bg-[#E6F8F1]"
                          : "border-gray-400"
                      } rounded-xl mx-1`}
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

      <div className="justify-end flex-1 flex  items-center bg-[#F4F5F8]  px-4 md:px-10 lg:px-28 py-[24px] my-[100px] border-t border-[#B3B3B3]">
        <div className="justify-center items-center ">
          <h2 className="text-2xl font-bold ">
            {product?.salePrice?.toLocaleString()}đ
          </h2>
        </div>
        <button className="bg-[#00B685] text-white  rounded-3xl hover:bg-green-600 text-xl p-2 mx-10">
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
