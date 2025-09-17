import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  faArrowRightFromBracket,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="shadow-md bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <img
          src={logo}
          alt="Logo"
          className="h-10 cursor-pointer lg:h-14"
          onClick={() => navigate("/")}
        />

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              {user.role === "JobSeekers" && (
                <h1
                  className="text-lg text-[#5c73db] cursor-pointer font-semibold"
                  onClick={() => navigate("/myapplications")}
                >
                  Applications
                </h1>
              )}
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="px-12 py-2 bg-[#5c73db] text-white text-md font-semibold rounded-lg hover:bg-[#4a5ec1] transition"
              >
                Logout <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-12 py-2 bg-[#5c73db] text-white text-md font-semibold rounded-lg hover:bg-[#4a5ec1] transition"
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
              className="text-xl text-gray-800"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3 space-y-3">
          {user ? (
            <div className="flex gap-6 justify-end">
              {/* Show Applications ONLY if role is JobSeeker */}
              {user.role === "JobSeekers" && (
                <h1
                  className="text-base text-[#5c73db] font-semibold cursor-pointer"
                  onClick={() => {
                    navigate("/myapplications");
                    setMenuOpen(false);
                  }}
                >
                  Applications
                </h1>
              )}
              <p
                onClick={() => {
                  logout();
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="text-[#5c73db] text-base font-semibold cursor-pointer transition"
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
              className="w-full px-4 py-2 bg-[#5c73db] text-white text-base font-semibold rounded-lg hover:bg-[#4a5ec1] transition"
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
