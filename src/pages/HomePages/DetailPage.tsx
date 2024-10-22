import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../models/IProduct";
import { FetchProductDetailApi } from "../../apis/ProductApi";
import { message } from "antd";

const DetailPage: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string | undefined>();
  const [image, setImage] = useState<string | undefined>();
  const { productId } = useParams();
  const [childProducts, setChildProducts] = useState<any[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, any>>({});
  const [product, setProduct] = useState<IProduct>();

  const [addProductToCart,setAddProductToCart]=useState<any>({})
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await FetchProductDetailApi(Number(productId));
      if (response.message) {
        message.error(response.message);
      } else {
        setProduct(response);
        console.log(response)
        setCurrentImage(response.images[0]);
        
        setChildProducts(response.child);
        const initialAttributes = response.attribute.reduce((acc: any, attr: any) => {
          acc[attr.name] = attr.values[0].value;
          return acc;
        }, {});
       
        console.log("ggg",image)
       
        setSelectedAttributes(initialAttributes);
     
        
      }
    };
    fetchProduct();
  }, [productId]);
useEffect(() => {
  const updatePrice = () => {
    const selectedChildProduct = childProducts.find((child) => {
      return Object.keys(selectedAttributes).every((key,index) => {
       
        return selectedAttributes[key] === child.variations[index].value;
      });
    });
 
    if (selectedChildProduct) {
      setAddProductToCart(selectedChildProduct);
      if(selectedChildProduct.images.length > 0){
        setImage(selectedChildProduct.images[0])
      }
      else setImage(product?.images[0]);
      setCurrentImage(product?.images[0]);
     console.log('ee',image)
     
console.log(selectedChildProduct)
    
      
    }
  }

  updatePrice();
}, [selectedAttributes, childProducts, product]);

const handleAttributeClick = (attrName: string, index: number) => {
  setSelectedAttributes((prev) => ({
    ...prev,
    [attrName]: product?.attribute.find(attr => attr.name === attrName)?.values[index].value,
  }));
};

 
 

  const getCartItems = () => JSON.parse(localStorage.getItem("cart") || "[]");

  const saveCartItems = (cart: any[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const updateCartItemQuantity = (cart: any[], cartItem: any, quantity: number) => {
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

const cartItem = {

  ...addProductToCart,
  imageProduct: currentImage,
  quantity: 1,

  
};
console.log(cartItem)
    const cart = getCartItems();

    const updatedQuantity = updateCartItemQuantity(cart, cartItem, 1);

    if (updatedQuantity) {
      message.success(`Đã tăng số lượng sản phẩm: ${product?.name} lên ${updatedQuantity}`);
    } else {
      // Nếu sản phẩm chưa có trong giỏ, thêm sản phẩm mới vào giỏ hàng
      cart.push(cartItem);
      message.success(`Đã thêm vào giỏ hàng: ${product?.name}`);
    }
  
    saveCartItems(cart);
  };

  const navigate = useNavigate();

  return (
    <div className="flex-1 flex-row bg-[#FFFFFF] mt-[96px]">
      {/* Left Section: Product Image */}
      <div className="flex flex-1 justify-start items-center lg:gap-2 px-4 md:px-10 lg:px-28 py-8">
        <button>
          <i className="fa-solid fa-home text-black lg:text-2xl mr-2" />
        </button>
        <p className="text-black lg:text-2xl">&gt;</p>
        {product && (
          <>
            <button
              className="text-gray-300 lg:text-2xl hover:bg-gray-300 hover:text-black justify-center items-center px-2 rounded-md"
              onClick={() => navigate(`/subpage/${product.category1?.id}`)}
            >
              {product.category1?.name && ` ${product.category1.name} `}
            </button>
            <p className="text-black lg:text-2xl">&gt;</p>
            <button
              className="text-gray-300 lg:text-2xl hover:bg-gray-300 hover:text-black justify-center items-center px-2 rounded-md"
              onClick={() => navigate(`/subpage/${product.category2?.id}`)}
            >
              {product.category2?.name && `${product.category2.name} `}
            </button>
            <p className="text-black lg:text-2xl">{product.category2?.name && '>'}</p>
            <p className="text-green-400 lg:text-2xl ">    {product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name}</p>
          </>
        )}
      </div>

      <div className="flex-1 lg:flex px-4 md:px-10 lg:px-28 lg:justify-between">
        <div className="justify-center items-center flex-1 lg:mr-[200px] flex flex-col">
          <img
            src={currentImage}
            alt={product?.name}
            className="lg:w-[500px] lg:h-[500px] md:w-[350px] md:h-[350px] w-[250px] h-[250px] rounded-md bg-gray-100"
          />
          <div className="flex gap-4 py-4">
            {product?.images.map((image) => (
              <img
                key={image}
                src={image}
                alt={product?.name}
                className="cursor-pointer w-[80px] h-[80px] rounded-md bg-gray-100"
                onClick={() => setCurrentImage(image)}
              />
            ))}
          </div>
        </div>
        
        {/* Right Section: Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">{product?.name}</h1>
          <div className="py-2 text-xl font-semibold">
          {addProductToCart && addProductToCart.price !== undefined && `${addProductToCart.price.toLocaleString("vi-VN")} đ`}

          </div>

          {/* Attribute Selection */}
          <div className="py-2">
            {product?.attribute.map((attr,index) => (
              <div key={attr.name} className="py-1">
                <h3 className="text-lg font-semibold">{attr.name}:</h3>
                <div className="flex gap-4">
                  {attr.values.map((value, index) => (
                    <button
                      key={value.value}
                      className={`border-2 rounded px-2 py-1 transition-colors hover:border-blue-300 ${
                        selectedAttributes[attr.name] === value.value
                          ? "border-green-300 text-green-400"
                          : " text-black"
                      }`}
                      onClick={() => handleAttributeClick(attr.name, index)}
                    >
                     {value.html_color ? (
                          <div
                            className="w-[24px] h-[24px] rounded-full"
                            style={{ backgroundColor: value.html_color }}
                          />
                        ) : (
                          <p className="text-lg font-normal px-[20px] py-[10px]">{value.value}</p>
                        )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            className="mt-4 px-4 py-2 my-2 bg-blue-600 text-white rounded hover:bg-blue-300"
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
