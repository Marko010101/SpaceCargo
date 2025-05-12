import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <main className=" max-w-7xl mx-auto p-3 w-full sm:p-2 ">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
