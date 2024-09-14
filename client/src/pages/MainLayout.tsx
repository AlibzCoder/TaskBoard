import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { getUser } from "../store/slices/userSlice";
import { doLogout } from "../store/slices/authSlice";


const MainLayout: React.FC = () => {
  const [gotUser, setGotUser] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!gotUser) {
      dispatch(getUser());
      setGotUser(true);
      document.addEventListener("CALL_LOGOUT", () => {
        dispatch(doLogout());
      });
    }
  }, []);

  return (
    <div className="main">
      <Outlet />
    </div>
  );
};

export default MainLayout;
