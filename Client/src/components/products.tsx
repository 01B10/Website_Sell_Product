import React from "react";
import { IProduct, ProductProps } from "../interface";
import { Link } from "react-router-dom";
import { FormatNumber } from "../helperFuct";

const Products: React.FC<ProductProps> = ({ data }) => {
  return (
    <div className="product w-[190px] h-[360px] flex flex-col justify-between border-[1px] border-black p-1 hover:bg-[rgba(0,0,0,0.2)] cursor-default transition">
      <div className="img mb-2 min-h-[200px]">
        <Link to={`/product/${data._id}`}>
          <img src={data.images[0].base_url} className="h-full w-full" alt="" />
        </Link>
      </div>
      <div className="infor">
        <Link to={`/product/${data._id}`}>
          <p className="text-[#444444] text-[14px] mb-[20px]">{data.name}</p>
        </Link>
        <p className="flex justify-between gap-2">
          <span className="text-[#D70018] text-[16px]">
            {FormatNumber(data.price)}
          </span>
          <span className="text-[#707070] text-[14px]">
            {FormatNumber(data.original_price)}
          </span>
        </p>
        <div className="flex items-center gap-1">
          <div className="flex">
            <img src="./rating.png" alt="" />
            <img src="./rating.png" alt="" />
            <img src="./rating.png" alt="" />
            <img src="./rating.png" alt="" />
            <img src="./rating.png" alt="" />
          </div>
          <p className="text-[12px]">72 đánh giá</p>
        </div>
      </div>
    </div>
  );
};

export default Products;
