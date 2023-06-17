import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema, RegisterForm, propData } from "../interface";
import { signup } from "../api/user";

const Register = (props: propData) => {
  const [err, setErr] = useState("");
  const { isSearch, setIsSearch } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterForm>({
    resolver: yupResolver(RegisterSchema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isSearch && setIsSearch) {
      setIsSearch(false);
      navigate("/");
    }
  }, [isSearch]);

  const onSubmit = async (data: RegisterForm) => {
    const res = await signup("/api/users", data)
      .then((res) => {
        alert("Đăng ký thành công");
        navigate("/login");
      })
      .catch((errors) => {
        setErr(errors.response.data.err);
      });
  };

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto my-8 bg-[#a1a1aa] max-w-[800px] px-[20px] py-[60px] rounded-[5px]"
      >
        {err && (
          <div className="text-center mx-auto bg-[#ef4444] w-[200px] p-[5px] text-white">
            {err}
          </div>
        )}
        <div className="flex justify-center gap-10 items-center">
          <div>
            <label htmlFor="" className="block w-[25vw] min-w-[250px]">
              <span className="block">Name</span>
              <input
                type="text"
                {...register("name")}
                className="border-[1px] border-solid border-[#C7C7C7] outline-none w-full rounded-[3px] py-1"
              />
              <p className="text-red-600 text-[13px] h-5 font-bold">
                {errors.name?.message}
              </p>
            </label>
            <label htmlFor="">
              <span className="block">Email</span>
              <input
                type="text"
                {...register("email")}
                className="border-[1px] border-solid border-[#C7C7C7] outline-none w-full rounded-[3px] py-1"
              />
              <p className="text-red-600 text-[13px] h-5 font-bold">
                {errors.email?.message}
              </p>
            </label>
            <label htmlFor="">
              <span className="block">Phone</span>
              <input
                type="text"
                {...register("phone")}
                className="border-[1px] border-solid border-[#C7C7C7] outline-none w-full rounded-[3px] py-1"
              />
              <p className="text-red-600 text-[13px] h-5 font-bold">
                {errors.phone?.message}
              </p>
            </label>
            <label htmlFor="">
              <span className="block">Password</span>
              <input
                type="text"
                {...register("password")}
                className="border-[1px] border-solid border-[#C7C7C7] outline-none w-full rounded-[3px] py-1"
              />
              <p className="text-red-600 text-[13px] h-5 font-bold">
                {errors.password?.message}
              </p>
            </label>
            <button
              type="submit"
              className="bg-[#FF424E] w-full text-white py-1 rounded-[5px]"
            >
              Register
            </button>
          </div>
          <div>
            <img src="http://localhost:8080/anhhtus-logo%202.png" alt="" />
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
