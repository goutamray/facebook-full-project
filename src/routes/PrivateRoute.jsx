import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuth";

import { Navigate, Outlet } from "react-router-dom";
import ProfileProvider from "../providers/ProfileProvider";

const PrivateRoute = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth.authToken ? (
        <ProfileProvider>
          <main className="mx-auto max-w-[1020px] py-8">
            <div className="container">
              <Header />
              <Outlet />
            </div>
          </main>
        </ProfileProvider>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;
