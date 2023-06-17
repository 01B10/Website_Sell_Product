import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formAddSchema, formAdd, IBrand, IProduct } from "../interface";
import uploadImage from "../api/images";
import { getBrand } from "../api/brand";
import { createItem } from "../api/products";
import { useNavigate } from "react-router-dom";
import { convertToBase64 } from "../helperFuct";

const FormAdd = () => {
  const [images, setImages] = useState<any>("");
  const [file, setFile] = useState<any>();
  const [brand, setBrand] = useState<IBrand[]>([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<formAdd>({
    resolver: yupResolver(formAddSchema),
  });

  const fectBrand = async () => {
    await getBrand("/api/brands").then(({ data }) => {
      setBrand(data.data);
    });
  };

  useEffect(() => {
    fectBrand();
  }, []);

  const onSubmit = async (e: formAdd) => {
    const form = new FormData();
    form.append("image", file);
    await uploadImage("/api/upload-image", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(({ data }) => {
        const dafaForm: IProduct = {
          name: e.name,
          price: e.price,
          original_price: e.original_price,
          description: e.description,
          shortdescription: e.shortdescription,
          images: [{ base_url: data.data }],
          brand: e.categories,
          specifications: [
            {
              name: "Content",
              attributes: [
                {
                  code: "battery_capacity",
                  name: "Dung lượng pin",
                  value: e.specifications,
                },
              ],
            },
          ],
        };
        console.log(dafaForm);

        return dafaForm;
      })
      .then(async (data) => {
        await createItem("/api/products", data);
        navigate("/admin");
      });
  };

  const openFile = () => {
    const file = document.querySelector("#File") as HTMLInputElement;
    file.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);
    const base64 = await convertToBase64(file);
    setImages(base64);
  };

  return (
    <div className="p-[20px]">
      <h2 className="text-[#5F5E61] text-[20px] ml-[200px] mb-[20px]">
        Thêm mới Sản phẩm
      </h2>
      <form
        action=""
        className="flex items-center gap-10 justify-center flex-wrap mx-auto w-full outline-none"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="" className="block">
            <div className="mb-[10px] border-[1px] border-black">
              <img
                src={images || "http://localhost:8080/anhhtus-logo%202.png"}
                alt=""
                className="w-[400px] h-[300px] object-cover cursor-pointer"
                onClick={openFile}
              />
              <input
                id="File"
                type="file"
                name="image"
                accept=".jpeg,.png,.jpg"
                onChange={handleFileUpload}
                hidden
              />
            </div>
            <div>
              <span className="block">Short Desciption</span>
              <textarea
                {...register("shortdescription")}
                className="border-[1px] border-solid border-black w-full outline-none"
              ></textarea>
              <p className="text-red-600 text-[11px] h-5 font-bold">
                {errors.shortdescription?.message}
              </p>
            </div>
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-[#3D5170] text-[16px]">Thông tin sản phẩm</h3>
          <label htmlFor="" className="block w-[450px]">
            <span className="block">Name</span>
            <input
              {...register("name")}
              className="border-[1px] border-solid border-black w-full outline-none"
            />
            <p className="text-red-600 text-[11px] h-5 font-bold">
              {errors.name?.message}
            </p>
          </label>
          <label htmlFor="" className="w-[450px] flex gap-6">
            <div>
              <span className="block">Origin_price</span>
              <input
                {...register("original_price")}
                className="border-[1px] border-solid border-black w-full outline-none"
              />
              <p className="text-red-600 text-[11px] h-12 font-bold">
                {errors.original_price?.message}
              </p>
            </div>
            <div>
              <span className="block">Price</span>
              <input
                {...register("price")}
                className="border-[1px] border-solid border-black w-full outline-none"
              />
              <p className="text-red-600 text-[11px] h-12 font-bold">
                {errors.price?.message}
              </p>
            </div>
          </label>
          <label htmlFor="" className="block w-[450px]">
            <span className="block">Categories</span>
            <select
              {...register("categories")}
              className="border-[1px] border-solid border-black w-full outline-none"
            >
              {brand.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="" className="block w-[450px]">
            <span className="block">Specication</span>
            <textarea
              {...register("specifications")}
              className="border-[1px] border-solid border-black w-full outline-none"
              rows={3}
            ></textarea>
            <p className="text-red-600 text-[11px] h-5 font-bold">
              {errors.specifications?.message}
            </p>
          </label>
          <label htmlFor="" className="block w-[450px]">
            <span className="block">Desciption</span>
            <textarea
              {...register("description")}
              className="border-[1px] border-solid border-black w-full outline-none"
              rows={3}
            ></textarea>
            <p className="text-red-600 text-[11px] h-5 font-bold">
              {errors.description?.message}
            </p>
          </label>
          <button className="bg-[#00B0D7] text-white w-[100px] p-1 rounded-[5px]">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAdd;
