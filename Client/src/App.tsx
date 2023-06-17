import { useEffect, useState } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import "./css/custom.css";
import HomePages from "./pages/home";
import DetailPages from "./pages/productsDetail";
import FormAdd from "./pages/formAdd";
import Register from "./pages/register";
import Login from "./pages/login";
import PageNotFound from "./pages/404";
import UserLayout from "./components/layout/userLayout";
import UserAdmin from "./components/layout/AdminLayout";
import DashBoard from "./pages/dashborad";
import FormUpdate from "./pages/formUpdate";
import { IProduct } from "./interface";
import { getAll } from "./api/products";
import Cart from "./components/cart";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [amount, setAmount] = useState("");

  const fetchProducts: any = async (uri: string = "") => {
    await getAll(`/api/products${uri}`).then(({ data }) => {
      setProducts(data.data);
    });
  };

  useEffect(() => {
    const formSearch = document.querySelector(".formSearch") as HTMLFormElement;
    formSearch?.addEventListener("submit", async (e) => {
      e.preventDefault();
      setIsSearch(true);
      const target = e.target as HTMLFormElement;
      const inputElement = target.children[0] as HTMLInputElement;
      await fetchProducts(`?q=${inputElement.value}`);
    });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route
              index
              element={<HomePages data={products} isSearch={isSearch} />}
            />
            <Route
              path="product/:idProduct"
              element={
                <DetailPages setIsSearch={setIsSearch} isSearch={isSearch} />
              }
            />
            <Route
              path="/login"
              element={<Login setIsSearch={setIsSearch} isSearch={isSearch} />}
            />
            <Route
              path="/register"
              element={
                <Register setIsSearch={setIsSearch} isSearch={isSearch} />
              }
            />
            <Route
              path="/cart"
              element={<Cart setIsSearch={setIsSearch} isSearch={isSearch} />}
            />
          </Route>
          <Route path="/admin" element={<UserAdmin />}>
            <Route
              index
              element={
                <DashBoard
                  data={products}
                  setIsSearch={setIsSearch}
                  isSearch={isSearch}
                />
              }
            ></Route>
            <Route path="add" element={<FormAdd />} />
            <Route path="update/:id" element={<FormUpdate />} />
          </Route>
          <Route path="/*" index element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
