import { useNavigate } from "react-router-dom";
import logout from "../../assets/icons/logout.svg";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      <button className="icon-btn cursor-pointer" onClick={handleLogout}>
        <img src={logout} alt="Logout" />
      </button>
    </div>
  );
};

export default Logout;
