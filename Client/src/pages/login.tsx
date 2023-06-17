import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema, LoginForm, propData } from "../interface";
import { auth, signin } from "../api/user";
import { useLocalStorage } from "../hook";
import { getAll } from "../api/products";

const Login = (props: propData) => {
  const { isSearch, setIsSearch } = props;
  const [err, setErr] = useState("");
  const [user, setUser] = useLocalStorage("user", null);
  const [admin, setAdmin] = useLocalStorage("admin", null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginForm>({
    resolver: yupResolver(LoginSchema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isSearch && setIsSearch) {
      setIsSearch(false);
      navigate("/");
    }
  }, [isSearch]);

  const onSubmit = async (data: LoginForm) => {
    await signin("/api/users/login", data)
      .then((response) => {
        const {
          data: { data },
        } = response;
        setErr("");
        return data;
      })
      .then(async (data) => {
        await auth("/api/users/userDetail", data.token)
          .then(({ data }) => {
            if (data.role == 1) {
              setUser(data);
              window.location.href = "/";
            } else {
              setAdmin(data);
              window.location.href = "/admin";
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setErr(err.response.data.err);
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
            <label htmlFor="" className="block w-[25vw] min-w-[250px]">
              <span className="block">Password</span>
              <input
                type="password"
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
              Login
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

export default Login;
