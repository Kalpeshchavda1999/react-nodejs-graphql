import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import { useEffect } from "react";
import routes from "../../constants/routes";

const AuthLayout = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  
  useEffect(() => {
    if(token) {
      navigate(routes.CLIENTS);
    }
  },[])

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
