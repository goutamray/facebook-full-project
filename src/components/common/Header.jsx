// import images
import Logo from "../../assets/images/logo.svg";
import HomeIcon from "../../assets/icons/home.svg";
import Notification from "../../assets/icons/notification.svg";

import { Link } from "react-router-dom";
import Logout from "../auth/Logout";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";

const Header = () => {
  const { auth } = useAuth();

  const { state } = useProfile();

  const user = state?.user ?? auth?.user;

  return (
    <div>
      <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
        <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link to="/">
            <img
              className="max-w-[100px] rounded-full lg:max-w-[130px]"
              src={Logo}
            />
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/" className="btn-primary">
              <img src={HomeIcon} alt="Home" />
              Home
            </Link>
            <button className="icon-btn">
              <img src={Notification} alt="Notification" />
            </button>

            <Logout />

            <button className="flex-center !ml-8 gap-3">
              <Link to="/me">
                <span className="text-md font-medium lg:text-lg text-white">
                  {user?.firstName} {user?.lastName}{" "}
                </span>
                <img
                  className="max-h-[32px] rounded-full max-w-[32px] lg:max-h-[32px] lg:max-w-[32px] object-cover"
                  src={`${import.meta.env.VITE_BASE_SERVER_URL}/${
                    user?.avatar
                  }`}
                  alt="avater"
                />
              </Link>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
