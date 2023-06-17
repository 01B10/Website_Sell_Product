import React, { useEffect, useState } from "react";
import Products from "../components/products";
import { getAll } from "../api/products";
import { IProduct, propData } from "../interface";

const HomePages = (props: propData) => {
  const { data, isSearch } = props;
  const [products, setProducts] = useState<IProduct[]>([]);

  return (
    <div className="mb-[120px] w-[90vw] mx-auto">
      <div className="banner my-[20px]">
        <img src="./Banner.png" alt="" className="w-full" />
      </div>
      <div className="container">
        <h2 className="text-[#444444] mb-3">ĐIỆN THOẠI NỔI BẬT NHẤT</h2>
        <div className="container-products flex flex-wrap gap-[17px] justify-center">
          {data && data.length > 0 ? (
            data.map((product) => {
              return <Products key={product._id} data={product} />;
            })
          ) : (
            <div className="font-bold">Không tìm thấy sản phẩm nào</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePages;
