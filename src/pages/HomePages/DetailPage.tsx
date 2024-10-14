import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../models/IProduct";
import { FetchProductDetailApi } from "../../apis/ProductApi";
import { message } from "antd";

const DetailPage: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string | undefined>();
  const { productId } = useParams();
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, number | null>
  >({});
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await FetchProductDetailApi(Number(productId));
      if (response.message) {
        message.error(response.message);
      } else {
        setProduct(response);
        setCurrentImage(response.images[0]);
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

  const getCartItems = () => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  };

  const saveCartItems = (cart: any[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const updateCartItemQuantity = (
    cart: any[],
    cartItem: any,
    quantity: number
  ) => {
    const existingItemIndex = cart.findIndex(
      (item: any) =>
        item.id === cartItem.id &&
        JSON.stringify(item.attributes) === JSON.stringify(cartItem.attributes)
    );
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
      return cart[existingItemIndex].quantity;
    }
    return null;
  };

  const handleAddToCart = () => {
    const attributesSelected = product?.attribute
      ?.map((attr) => {
        const selectedValueIndex = selectedAttributes[attr.name];
        return selectedValueIndex !== undefined
          ? `${attr.name}: ${attr.values[selectedValueIndex!].value}`
          : null;
      })
      .filter(Boolean);

    const cartItem = {
      id: product?.id,
      name: product?.name,
      price: product?.price,
      quantity: 1,
      attributes: attributesSelected || [],
      image: currentImage,
    };

    const cart = getCartItems();

    if (attributesSelected && attributesSelected.length > 0) {
      const allAttributesSelected = product?.attribute?.every(
        (attr) => selectedAttributes[attr.name] !== null
      );

      if (!allAttributesSelected) {
        message.error("Vui lòng chọn đầy đủ các thuộc tính.");
        return;
      }
      const updatedQuantity = updateCartItemQuantity(cart, cartItem, 1);
      if (updatedQuantity) {
        message.success(
          `Đã tăng số lượng sản phẩm: ${product?.name} lên ${updatedQuantity}`
        );
      } else {
        cart.push(cartItem);
        message.success(
          `Đã thêm vào giỏ hàng: ${
            product?.name
          } với các thuộc tính: ${attributesSelected.join(", ")}`
        );
      }
    } else {
      const updatedQuantity = updateCartItemQuantity(cart, cartItem, 1);
      if (updatedQuantity) {
        message.success(
          `Đã tăng số lượng sản phẩm: ${product?.name} lên ${updatedQuantity}`
        );
      } else {
        cart.push(cartItem);
        message.success(`Đã thêm vào giỏ hàng: ${product?.name}`);
      }
    }

    saveCartItems(cart);
  };
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex-row bg-[#FFFFFF] mt-[96px]">
      {/* Left Section: Product Image */}
      <div className="flex flex-1 justify-start items-center gap-2 px-4 md:px-10 lg:px-28 py-8">
        <i className="fa-solid fa-home text-black" />
        {product && (
          <>
            <p
              className="text-black font-2xl"
              onClick={() => navigate(`/subpage/${product.category1?.id}`)}
            >
              {product.category1?.name && `${product.category1.name} >`}
            </p>
            <p
              className="text-black font-2xl"
              onClick={() => navigate(`/subpage/${product.category2?.id}`)}
            >
              {product.category2?.name && `${product.category2.name} >`}
            </p>
            <p className="text-green-400 font-2xl ">{product.name}</p>
          </>
        )}
      </div>
      <div className="h-[100px] flex-1 justify-center items-center "></div>
      <div className="flex-1 lg:flex px-4 md:px-10 lg:px-28 lg:justify-between">
        <div className="justify-center items-center">
          <img
            src={currentImage}
            alt={product?.name}
            className="w-full h-auto max-w-md"
          />
          <div className="flex border border-gray-300 p-2 gap-3 rounded-md">
            {product?.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product?.name}
                className="w-[80px] h-[80px] object-cover mx-1 cursor-pointer"
                onClick={() => setCurrentImage(img)}
              />
            ))}
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-2xl font-bold">{product?.name}</h2>
            <div className="border flex-1 my-2 border-slate-800" />
          </div>
          <div>
            {product?.attribute?.length ? (
              product.attribute.map((attr, attrIndex) => (
                <div key={attrIndex} className="flex-1 gap-2">
                  <p className="text-xl font-semibold my-4">{attr.name}</p>
                  <div className="flex">
                    {attr.values.map((value, index) => (
                      <div
                        key={index}
                        className={`border p-4 gap-2 ${
                          selectedAttributes[attr.name] === index
                            ? "border-green-400 bg-[#E6F8F1]"
                            : "border-gray-400"
                        } rounded-xl mx-1 cursor-pointer`}
                        onClick={() => handleAttributeClick(attr.name, index)}
                      >
                        {value.html_color ? (
                          <div
                            className="w-[24px] h-[24px] rounded-full"
                            style={{ backgroundColor: value.html_color }}
                          />
                        ) : (
                          <p className="text-lg font-normal">{value.value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-lg font-normal my-4">
                Sản phẩm này không có thuộc tính cần chọn.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="justify-end flex-1 flex items-center bg-[#F4F5F8] px-4 md:px-10 lg:px-28 py-[24px] my-[100px] border-t border-[#B3B3B3]">
        <div className="justify-center items-center">
          <h2 className="text-2xl font-bold">
            {product?.price?.toLocaleString()}đ
          </h2>
        </div>
        <button
          className="bg-[#00B685] text-white rounded-3xl hover:bg-green-600 text-xl p-2 mx-10"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
