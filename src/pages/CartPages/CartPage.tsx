import React, { useEffect, useState } from "react";
import { message } from "antd";
import { Navigate, useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  attributes: { [key: string]: string | null }; // Lưu thuộc tính sản phẩm
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Lấy giỏ hàng từ LocalStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const handleIncreaseQuantity = (item: CartItem) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    //  message.success(`Đã tăng số lượng của sản phẩm: ${item.name}`);
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // message.success(`Đã giảm số lượng của sản phẩm: ${item.name}`);
  };

  const handleRemoveItem = (item: CartItem) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    //message.success(`Đã xóa sản phẩm: ${item.name}`);
  };

  // Tính toán tổng số lượng và tạm tính
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className=" flex-col items-center mt-[96px] flex-1">
      <div className=" flex items-center ml-[20px]">
        <i className="fa-solid fa-home" onClick={() => navigate("/")} />
        <p className="text-xl font-bold text-green-500"> {" >"} Giỏ hàng</p>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-xl">Giỏ hàng trống.</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-1 items-center  w-full  bg-white p-4"
          >
            <div className="mr-[20px]">
              <img
                src={item.image}
                alt={item.name}
                className="w-[150px] h-[150px] object-cover"
              />
              <p className="text-lg">
                Giá: {(item.price * item.quantity).toLocaleString()}đ
              </p>
              <p className="text-lg line-through">
                {item.price.toLocaleString()}đ/cái
              </p>
            </div>
            <div>
              <div className="flex-1 mx-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>

                {/* Hiển thị thuộc tính */}
                <div className="mt-2">
                  {item.attributes &&
                    Object.entries(item.attributes).map(
                      ([attrName, attrValue]) => (
                        <p
                          key={attrName}
                          className="text-sm text-gray-400 font-semibold"
                        >
                          {attrValue}
                        </p>
                      )
                    )}
                </div>
              </div>
              <div className="flex items-center my-4">
                <button
                  onClick={() => handleDecreaseQuantity(item)}
                  className="rounded w-[40px] h-[40px] border-4 border-gray-400 text-[20px] font-bold text-gray-400"
                >
                  -
                </button>
                <p className="text-lg mx-2 text-[20px] text-gray-400 font-bold">
                  {item.quantity}
                </p>{" "}
                <button
                  onClick={() => handleIncreaseQuantity(item)}
                  className="rounded w-[40px] h-[40px] border-4 border-gray-400 text-[20px] font-bold text-gray-400"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemoveItem(item)}
                className="text-red-500 rounded p-2 text-xl font-bold flex items-center gap-2"
              >
                <i className="fa-solid fa-trash" />
                <p>Xóa</p>
              </button>
            </div>
          </div>
        ))
      )}

      {/* Phần hiển thị tổng hợp */}
      {cartItems.length > 0 && (
        <div className="mt-10 w-full bg-gray-100 p-4 rounded flex-1">
          <div className="flex justify-between">
            <div>
              <p className="text-lg text-gray-400">Tổng số lượng: </p>
              <p className="text-lg text-gray-400">Tạm tính:</p>
              <p className="text-lg text-gray-400">Giảm giá: </p>
              <hr className="my-2" />
              <h2 className="text-2xl font-bold">Tổng:</h2>
            </div>

            <div className="justify-end">
              <p>{totalQuantity}</p>
              <p>{totalPrice.toLocaleString()}đ</p>
              <p>0đ</p>
              <hr className="my-2" />
              <h2 className="text-2xl font-bold  text-green-600">
                {totalPrice.toLocaleString()}đ
              </h2>
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div className="mt-4 flex-1">
            <h3 className="text-lg font-semibold">Phương thức thanh toán</h3>
            <div className="flex-1 justify-between">
              <label className="">
                <input type="radio" name="paymentMethod" defaultChecked /> Thanh
                toán online
              </label>
              <label className="ml-4">
                <input type="radio" name="paymentMethod" /> Thanh toán khi nhận
                hàng
              </label>
            </div>
          </div>

          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
            Tiếp tục thanh toán
          </button>
          <button
            className="mt-2 w-full text-blue-600 py-2 rounded"
            onClick={() => navigate("/")}
          >
            Tiếp tục mua sắm
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
