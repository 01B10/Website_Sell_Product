import React, { useEffect, useState } from "react";
import { IBrand, IProduct, propData } from "../interface";
import { getBrand } from "../api/brand";
import { deleteItem, getAll } from "../api/products";
import { Link } from "react-router-dom";
import { FormatNumber } from "../helperFuct";
import parse from "html-react-parser";

const DashBoard = (props: propData) => {
  const { data, setIsSearch, isSearch } = props;
  const [brand, setBrand] = useState<IBrand[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (isSearch && data) {
      setProducts(data);
    }
  });

  const fetchProducts = async (uri: string = "") => {
    await getAll(`/api/products${uri}`).then(({ data }) => {
      setProducts(data.data);
    });
  };

  const fectBrand = async () => {
    await getBrand("/api/brands").then(({ data }) => {
      setBrand(data.data);
    });
  };

  const selectOption = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsSearch && setIsSearch(false);
    await fetchProducts(`?brand=${e.target.value}`);
  };

  const deleteProduct = async (id?: string) => {
    await deleteItem(`/api/products/${id}`).then(() => {
      const newData = products.filter((item) => item._id != id);
      setProducts(newData);
    });
  };

  useEffect(() => {
    fetchProducts();
    fectBrand();
  }, []);

  return (
    <div className="bg-[#94a3b8] pt-[30px] pb-[100px]">
      <div className="max-w-[1100px] mx-auto">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-[20px] font-bold">Điện thoại</h2>
            <div className="cursor-pointer">
              <Link to={"/admin/add"}>
                <i className="fa-regular fa-square-plus fa-beat text-[50px] text-[#0369a1]"></i>
              </Link>
            </div>
          </div>
          <div className="py-[20px]">
            <h3 className="text-[#5A6169] text-[13px] font-bold">
              Danh Mục sản phẩm
            </h3>
            <select
              name=""
              id=""
              className="border-[1px] border-solid border-[#E1E5EB] py-[5px] w-[250px] cursor-pointer outline-none rounded-[5px]"
              onChange={selectOption}
            >
              <option value="">All</option>
              {brand.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <table className="rounded-[5px] overflow-hidden" width="100%">
            <thead className="bg-[#FBFBFB] border-b-[1px] border-b-[#DEE2E6]">
              <tr>
                <th className="py-3">#</th>
                <th className="py-3">Tên sản phẩm</th>
                <th className="py-3">Images</th>
                <th className="py-3">Thành tiền</th>
                <th className="py-3">Mô tả ngắn</th>
                <th className="py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr
                    key={index}
                    className="text-center bg-[#FBFBFB] border-b-[1px] border-b-[#DEE2E6]"
                  >
                    <td className="py-3">{index + 1}</td>
                    <td className="py-3">{product.name}</td>
                    <td className="py-3">
                      <div className="w-[100px] h-[100px]">
                        <img
                          src={product.images[0].base_url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3">
                      {FormatNumber(product.original_price)}
                    </td>
                    <td className="shortDes py-3">
                      {parse(String(product.shortdescription))}
                    </td>
                    <td className="py-3 my-auto">
                      <Link
                        to={`/admin/update/${product._id}`}
                        className="bg-green-500 font-bold p-2 rounded-[5px] mr-2"
                      >
                        Update
                      </Link>
                      <Link
                        to={`/admin`}
                        className="bg-red-500 font-bold p-2 rounded-[5px]"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
