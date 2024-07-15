import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { clearCart } from "@/redux/features/cartSlice";

const MainLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue =
        "You have unsaved changes, do you really want to leave?";
      return event.returnValue;
    };

    const handleUnload = () => {
      dispatch(clearCart());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [dispatch]);
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
