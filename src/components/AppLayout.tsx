import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
