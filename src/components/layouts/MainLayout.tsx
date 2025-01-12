import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";

const MainLayout = () => {
  return (
    <div className="">
      <div className="sticky top-0 z-50 bg-[#1b1b1b] text-white">
        <NavBar />
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
