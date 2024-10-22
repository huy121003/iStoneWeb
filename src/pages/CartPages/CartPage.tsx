import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageProduct: string;
  variations: any[]; // Lưu thuộc tính sản phẩm
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
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
  };

  const handleRemoveItem = (item: CartItem) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (

 

    <div className=" flex-col  mt-[96px] flex-1">
      <div className=" flex items-center ml-[20px]">

        <i className="fa-solid fa-home" onClick={() => navigate("/")} />
        <p className="text-xl font-bold text-green-500 ml-2">{" >"} Giỏ hàng</p>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-xl">Giỏ hàng trống.</p>
      ) : (
        <div className="lg:flex lg:gap-6 w-full">
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center w-full bg-white p-4 rounded-lg shadow-lg justify-between"
              >
                <div className="flex flex-1 gap-4">
                  <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[150px] lg:h-[150px]">
                    <img
                      src={item.imageProduct}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <h2 className="font-bold text-sm sm:text-lg lg:text-xl">
                      {item.name}
                    </h2>
                    {item.variations?.map((vari) => (
                      <p key={vari.name} className="text-xs text-gray-400">
                        {vari.name}: {vari.value}
                      </p>
                    ))}
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleDecreaseQuantity(item)}
                        className="rounded w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] border-2 border-gray-400 text-sm font-bold"
                      >
                        -
                      </button>
                      <p className="mx-2 text-sm lg:text-lg font-bold">
                        {item.quantity}
                      </p>
                      <button
                        onClick={() => handleIncreaseQuantity(item)}
                        className="rounded w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] border-2 border-gray-400 text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="text-red-500 text-sm lg:text-lg flex items-center gap-2"
                    >
                      <i className="fa-solid fa-trash" />
                      Xóa
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm lg:text-xl">
                    {(item.price * item.quantity).toLocaleString()}đ
                  </p>
                  <p className="line-through text-xs lg:text-sm">
                    {item.price.toLocaleString()}đ/cái
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-[400px] mt-8 lg:mt-0">
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between mb-2">
                <p className="text-lg text-gray-500">Tổng số lượng:</p>
                <p>{totalQuantity}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-lg text-gray-500">Tạm tính:</p>
                <p>{totalPrice.toLocaleString()}đ</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-lg text-gray-500">Giảm giá:</p>
                <p>0đ</p>
              </div>
              <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">Tổng:</h2>
                <h2 className="text-2xl font-bold text-green-600">
                  {totalPrice.toLocaleString()}đ
                </h2>
              </div>

              <h3 className="text-lg font-semibold mb-2">Phương thức thanh toán</h3>
              <div className="flex flex-col gap-2">
                <label>
                  <input type="radio" name="paymentMethod" defaultChecked />
                  <span className="ml-2">Thanh toán online</span>
                </label>
                <label>
                  <input type="radio" name="paymentMethod" />
                  <span className="ml-2">Thanh toán khi nhận hàng</span>
                </label>
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">
                Tiếp tục thanh toán
              </button>
              <button
                className="mt-2 w-full text-blue-600 py-2 rounded-lg"
                onClick={() => navigate("/")}
              >
                Tiếp tục mua sắm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
