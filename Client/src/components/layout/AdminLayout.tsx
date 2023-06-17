import { Outlet } from "react-router-dom";
import UserHeader from "../user.header";
import UserFooter from "../user.footer";
import { useLocalStorage } from "../../hook";
const UserAdmin = () => {
  const [admin, setAdmin] = useLocalStorage("admin", null);
  if (admin) {
    return (
      <>
        <UserHeader />
        <Outlet />
      </>
    );
  }
  return (
    <div className="text-center mt-[100px] font-bold text-[40px]">
      Page Not found
    </div>
  );
};

export default UserAdmin;
