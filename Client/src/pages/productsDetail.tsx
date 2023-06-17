import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getItem } from "../api/products";
import { IBrand, IProduct, cart, cartItem, propData } from "../interface";
import parse from "html-react-parser";
import { getBrand } from "../api/brand";
import { FormatNumber } from "../helperFuct";
import { addToCart, getUser } from "../api/user";
import { useLocalStorage } from "../hook";

const DetailPages = (props: propData) => {
  const [user, setUser] = useLocalStorage("user", null);
  const { isSearch, setIsSearch } = props;
  const [item, setItem] = useState<IProduct>();
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const { idProduct } = useParams();

  const fetchBrand = async (id: string) => {
    await getBrand("/api/brands").then(({ data }) => {
      const namebrand = data.data.filter((item: IBrand) => {
        return item._id == id && item.name;
      });
      setBrand(namebrand[0].name);
    });
  };

  const HandleaddToCart = async () => {
    if (user) {
      const { data } = (await getUser("/api/users", user.id)).data;
      const cart: cart["cart"] = data.cart;
      let boolean = false;
      cart.map((item) => {
        if (item._id == idProduct) {
          boolean = true;
          item.amount += 1;
        }
      });
      if (!boolean) {
        cart.push({
          _id: idProduct,
          amount: 1,
        });
      }
      await addToCart(`/api/users/${user.id}`, {
        cart: [...cart],
      });
    } else {
      navigate("/login");
    }
  };

  const fetchItem = async () => {
    await getItem("/api/products", idProduct).then(({ data }) => {
      setItem(data.data);
      fetchBrand(data.data.brand);
      setName(data.data.name);
    });
  };

  useEffect(() => {
    fetchItem();
  }, []);

  useEffect(() => {
    const btnshow = document.querySelector(".btnText") as HTMLDivElement;
    const showText = document.querySelector(".shortText") as HTMLDivElement;
    btnshow.onclick = () => {
      showText.classList.toggle("showText");
    };
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isSearch && setIsSearch) {
      setIsSearch(false);
      navigate("/");
    }
  }, [isSearch]);

  return (
    <>
      <div className="backlink shadow-lg">
        <nav className="py-3 max-w-[915px] mx-auto">
          <ul className="flex gap-2 text-[#707070] text-[12px] font-bold">
            <li>
              <Link to={"/"}>Trang Chủ</Link>
            </li>
            <li>{brand}</li>
            <li>{name}</li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto mb-[100px]">
        <h2 className="max-w-[900px] mx-auto my-2">{item?.name}</h2>
        <hr />
        <div className="detailProducts max-w-[900px] mx-auto">
          <div className="mt-[20px] mb-[30px] flex gap-[100px]">
            <div>
              <div className="mb-[40px] w-[26.20vw]">
                <img src={item?.images[0].base_url} className="w-full" alt="" />
              </div>
              <div className="thumbail flex flex-wrap items-center gap-2">
                <div className="p-1 border-[1px] inline-block border-[#D70018] rounded-[5px] cursor-pointer">
                  <div className="">
                    <img
                      src="http://localhost:8080/TinhNang.png"
                      alt=""
                      className="mx-auto"
                    />
                  </div>
                  <small className="text-[8px] block text-center w-[60px]">
                    Tình năng nổi bật
                  </small>
                </div>
                {item?.images.map((img, index) => {
                  return (
                    <div
                      key={index}
                      className="p-1 border-[1px] inline-block border-[#D1D5DB] rounded-[5px] cursor-pointer"
                    >
                      <div className="w-[48px] h-[48px]">
                        <img
                          src={img.thumbnail_url}
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col justify-between items-start">
              <div>
                <h3 className="flex gap-3 items-end mb-5">
                  <span className="text-[#D70018] text-[24px]">
                    {FormatNumber(Number(item?.price))}
                  </span>
                  <span className="text-[#707070] text-[14px]">
                    {FormatNumber(Number(item?.original_price))}
                  </span>
                </h3>
                <p className="text-[15px] text-[#444444]">
                  Mô tả ngắn: {item?.shortdescription}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#FF3945] text-center leading-[40px] text-white text-[14px] w-[200px] h-[40px] rounded-[5px] cursor-pointer">
                  Mua ngay
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="border-[1px] border-[#D70018] inline-block p-2 rounded-[3px] cursor-pointer active:bg-slate-400"
                    onClick={() => HandleaddToCart()}
                  >
                    <img src="http://localhost:8080/IconCart.png" alt="" />
                  </div>
                  <p className="text-[14px] w-[70px] text-center select-none">
                    Thêm vào giỏ hàng
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="shortText">{parse(String(item?.description))}</div>
            <div className="btnText text-[14px] w-[300px] border-[1px] border-black text-center py-1 mx-auto rounded-[5px] cursor-pointer mt-4 hover:bg-slate-400">
              Xem thêm
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPages;
