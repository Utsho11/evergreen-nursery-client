import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
