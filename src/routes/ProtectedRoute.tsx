import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/auth/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
