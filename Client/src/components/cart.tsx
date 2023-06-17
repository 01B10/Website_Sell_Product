import { useEffect, useState } from "react";
import { cart, cartItem, propData } from "../interface";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, getUser } from "../api/user";
import { useLocalStorage } from "../hook";
import { FormatNumber } from "../helperFuct";

const Cart = (props: propData) => {
  const { isSearch, setIsSearch } = props;
  const [user, setUser] = useLocalStorage("user", null);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState<cartItem[]>([]);

  const fecthCart = async () => {
    await getUser("/api/cart", user.id).then(({ data }) => {
      let total = 0;
      const cart: cartItem[] = data.data.cart;
      cart.map((item) => {
        total += item.amount * item._id.original_price;
      });
      setTotal(total);
      setCart(cart);
    });
  };

  const deleteCart = async (id: string) => {
    const { data } = (await getUser("/api/users", user.id)).data;
    const cart: cart["cart"] = data.cart;

    let index;
    index = cart.findIndex((item) => {
      return item._id == id;
    });
    cart.splice(index, 1);
    await addToCart(`/api/users/${user.id}`, {
      cart: [...cart],
    });
    await fecthCart();
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isSearch && setIsSearch) {
      setIsSearch(false);
      navigate("/");
    }
  }, [isSearch]);

  useEffect(() => {
    fecthCart();
  }, []);

  // console.log(cart);

  return cart.length > 0 ? (
    <div className="flex p-[20px] mb-[200px]">
      <div className="mx-auto">
        <Link to={"/"}>
          <div className="text-[#D70018] text-center">Trở về</div>
        </Link>
        <h3 className="text-[#D70018] font-bold text-center mb-[30px]">
          Giỏ hàng
        </h3>
        <div className="flex flex-col gap-10">
          {cart.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-rows gap-3 border-[1px] border-black p-3 relative"
              >
                <div className="max-w-[190px] max-h-[190px]">
                  <img
                    src={item._id.images[0].base_url}
                    alt=""
                    className="wi-full h-full"
                  />
                </div>
                <div className="infor">
                  <h4 className="text-[#0E2431]">{item._id.name}</h4>
                  <h4 className="flex gap-2">
                    <span className="text-[#D70018]">
                      {FormatNumber(item._id.original_price)}
                    </span>
                    <span className="text-[#777777]">
                      {FormatNumber(item._id.price)}
                    </span>
                  </h4>
                  <h4>Amount: {item.amount}</h4>
                </div>
                <i
                  className="fa-solid fa-xmark text-[25px] cursor-pointer absolute top-0 right-[-30px]"
                  onClick={() => deleteCart(item._id._id)}
                ></i>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[#0E2431] mb-3">
          Tổng tiền tạm tính:
          <span className="text-[#D70018]">{FormatNumber(total)}</span>
        </div>
        <div className="text-[#FFFFFF] bg-[#D70018] text-center py-2 rounded-[3p]x mb-5 cursor-pointer">
          Tiến hành đặt hàng
        </div>
        <div className="text-[#DC3545] bg-white border-[1px] border-[#DC3545] text-center py-2 rounded-[3p]x cursor-pointer">
          Chọn thêm sản phẩm khác
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center my-[100px] font-bold text-[40px]">
      Bạn không có sản phẩm nào
    </div>
  );
};

export default Cart;
