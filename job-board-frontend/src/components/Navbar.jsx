import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import {
  faArrowRightFromBracket,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) return <div>Loading...</div>;

  return (
    <nav className="shadow-md bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <img
          src="./src/assets/logo.png"
          alt="Logo"
          className="h-14 cursor-pointer lg:h-20 "
          onClick={() => navigate("/")}
        />

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-8">
          {user ? (
            <>
              <h1
                className="text-2xl text-[#5c73db] cursor-pointer font-semibold"
                onClick={() => navigate("/myapplications")}
              >
                Applications
              </h1>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="px-12 py-3 bg-[#5c73db] text-white text-xl font-semibold rounded-lg hover:bg-[#4a5ec1] transition"
              >
                Logout <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-14 py-3 bg-[#5c73db] text-white text-xl font-semibold rounded-lg hover:bg-[#4a5ec1] transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FontAwesomeIcon
              icon={menuOpen ? faTimes : faBars}
              className="text-2xl  text-gray-800"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4">
          {user ? (
            <div className="flex gap-8  justify-end ">
              <h1
                className="text-xl text-[#5c73db] font-semibold cursor-pointer"
                onClick={() => {
                  navigate("/myapplications");
                  setMenuOpen(false);
                }}
              >
                Applications
              </h1>
              <p
                onClick={() => {
                  logout();
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="text-[#5c73db] text-xl font-semibold cursor-pointer transition"
              >
                Logout <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </p>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="w-full px-6 py-2 bg-[#5c73db] text-white text-lg font-semibold rounded-lg hover:bg-[#4a5ec1] transition"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
