import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/custom.css";
import { useLocalStorage } from "../hook";
import { IProduct } from "../interface";

const UserHeader = () => {
  const [user, setUser] = useLocalStorage("user", null);
  const [admin, setAdmin] = useLocalStorage("admin", null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const navigate = useNavigate();

  const onMouseOver = () => {
    const userIcon = document.querySelector(".user") as HTMLElement;
    userIcon.style.display = "block";
  };

  useEffect(() => {
    let root = document.body.querySelector("#root") as HTMLDivElement;
    root.addEventListener("mousemove", (e) => {
      const userIcon = document.querySelector(".user") as HTMLElement;
      const target = e.target as HTMLElement;
      if (!target.closest(".boxUser")) {
        userIcon.style.display = "none";
      }
    });
  });

  const LogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    setUser(null);
    setAdmin(null);
    navigate("/");
  };

  return (
    <header
      className={
        localStorage.getItem("admin") != "null"
          ? "bg-[#0e7490] py-1"
          : "bg-red-500 py-1"
      }
    >
      <div className="header flex justify-center mx-auto items-center gap-20 max-w-[950px]">
        <div className="Logo min-w-[70px] h-[57px]">
          <Link to={localStorage.getItem("admin") != "null" ? "/admin" : "/"}>
            <img
              src="http://localhost:8080/anhhtus-logo%202.png"
              alt=""
              className="w-full h-full"
            />
          </Link>
        </div>
        <form action="" className="formSearch w-full relative">
          <input
            type="search"
            className="Search outline-none rounded-[10px] w-full pl-6 py-1"
          />
          <button className="absolute left-1 top-1/2 translate-y-[-50%]">
            <img src="http://localhost:8080/search.png" alt="" />
          </button>
        </form>
        {user || admin ? (
          <div className="boxUser flex justify-center gap-3 items-center relative">
            <i
              onMouseOver={onMouseOver}
              className="fa-solid fa-user text-[30px] text-white cursor-pointer"
            ></i>
            <div className="flex gap-3 items-center">
              <p className="text-center block">Xin chào</p>
              <span className="font-bold text-white">
                {user ? user.name : admin.name}
              </span>
            </div>
            <div
              onClick={LogOut}
              className="user cursor-pointer absolute bottom-[-30px] left-[-20px] bg-[#4d7c0f] text-white py-[5px] px-3 rounded-[5px] hidden"
            >
              LogOut
            </div>
            <Link to={"/cart"}>
              {user ? (
                <i className="fa-solid fa-cart-shopping fa-beat-fade cursor-pointer text-[25px]"></i>
              ) : (
                ""
              )}
            </Link>
          </div>
        ) : (
          <div className="boxUser flex justify-center gap-3 items-center relative">
            <i
              onMouseOver={onMouseOver}
              className="fa-solid fa-user text-[30px] text-white cursor-pointer"
            ></i>
            <div className="flex gap-3"></div>
            <div className="user cursor-pointer absolute bottom-[-88px] left-[-35px] bg-[#4d7c0f] text-white w-[100px] text-center rounded-[5px] hidden overflow-hidden">
              <Link to={"/register"}>
                <div className="hover:bg-slate-500 w-full p-[10px]">SigUp</div>
              </Link>
              <Link to={"/login"}>
                <div className="hover:bg-slate-500 w-full p-[10px]">SigIn</div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default UserHeader;
