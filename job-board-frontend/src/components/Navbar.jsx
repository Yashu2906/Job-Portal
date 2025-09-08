import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-between px-12 py-8 shadow-md bg-white">
      {/* Logo */}
      <img
        src="./src/assets/logo.png"
        alt="Logo"
        className="h-20 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Buttons */}
      {user ? (
        <button
          onClick={(logout, () => navigate("/login"))}
          className="px-14 py-3 bg-[#5c73db] text-white text-[24px] font-semibold rounded-lg hover:bg-[#4a5ec1] transition"
        >
          Logout{"  "}
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-14 py-3 bg-[#5c73db] text-white text-[24px] font-semibold rounded-lg hover:bg-[#4a5ec1] transition"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
