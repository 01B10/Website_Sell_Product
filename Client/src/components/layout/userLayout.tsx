import { Outlet, Route, Routes } from "react-router-dom";
import UserHeader from "../user.header";
import UserFooter from "../user.footer";
const UserLayout = () => {
  return (
    <>
      <UserHeader />
      <Outlet />
      <UserFooter />
    </>
  );
};

export default UserLayout;
