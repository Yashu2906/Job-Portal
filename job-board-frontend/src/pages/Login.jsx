import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState("JobSeekers");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const data = await register(name, email, password, selectedRole);
        toast.success(data?.message);
        if (data?.success) {
          if (selectedRole === "Company") {
            navigate("/company");
          } else {
            navigate("/");
          }
        }
      } else {
        const data = await login(email, password);
        toast.success(data?.message);
        if (data?.success) {
          if (data?.user?.role === "Company") {
            navigate("/company");
          } else {
            navigate("/");
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff] px-4">
      <img
        src="./src/assets/logo.png"
        alt="Logo"
        className="h-16 sm:h-20 mb-5 cursor-pointer"
      />

      <div className="relative w-full max-w-[1250px] h-auto lg:h-[800px] bg-white overflow-hidden rounded-[30px] sm:rounded-[50px] shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col lg:flex-row">
        {/* Login */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full lg:w-1/2 flex flex-col justify-center items-center text-[#333] p-6 sm:p-8"
        >
          <h1 className="text-3xl sm:text-4xl  lg:text-6xl mt-12 lg:mt-0 font-bold text-center ">
            Login
          </h1>

          <div className="relative flex mt-6 sm:mt-10 w-full max-w-[500px]">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 sm:h-16 px-5 pr-12 bg-[#eee] text-lg sm:text-xl lg:text-2xl font-medium rounded-xl outline-none"
              type="email"
              value={email}
              placeholder="Email"
              required
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xl sm:text-2xl lg:text-3xl"
            />
          </div>

          <div className="relative flex mt-4 sm:mt-6 w-full max-w-[500px]">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 sm:h-16 px-5 pr-14 bg-[#eee] text-lg sm:text-xl lg:text-2xl font-medium rounded-xl outline-none"
              type="password"
              value={password}
              placeholder="Password"
              required
            />
            <FontAwesomeIcon
              icon={faLock}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xl sm:text-2xl lg:text-3xl text-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full max-w-[500px] h-14 sm:h-16 bg-[#7494ec] rounded-xl text-white text-lg sm:text-xl lg:text-2xl font-bold mt-6 sm:mt-8"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full lg:w-1/2 flex flex-col justify-center items-center text-[#333] p-6 sm:p-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-6xl mt-10 sm:mt-25 lg:mt-2  font-bold text-center">
            Register
          </h1>

          <div className="relative flex mt-6 sm:mt-10 w-full max-w-[500px]">
            <input
              onChange={(e) => setName(e.target.value)}
              className="w-full h-14 sm:h-16 px-5 pr-12 bg-[#eee] text-lg sm:text-xl lg:text-2xl font-medium rounded-xl outline-none"
              type="text"
              value={name}
              placeholder="Name"
              required
            />
            <FontAwesomeIcon
              icon={faUser}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xl sm:text-2xl lg:text-3xl"
            />
          </div>

          <div className="relative flex mt-4 sm:mt-6 w-full max-w-[500px]">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 sm:h-16 px-5 pr-12 bg-[#eee] text-lg sm:text-xl lg:text-2xl font-medium rounded-xl outline-none"
              type="email"
              value={email}
              placeholder="Email"
              required
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xl sm:text-2xl lg:text-3xl"
            />
          </div>

          <div className="relative flex mt-4 sm:mt-6 w-full max-w-[500px]">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 sm:h-16 px-5 pr-14 bg-[#eee] text-lg sm:text-xl lg:text-2xl font-medium rounded-xl outline-none"
              type="password"
              value={password}
              placeholder="Password"
              required
            />
            <FontAwesomeIcon
              icon={faLock}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xl sm:text-2xl lg:text-3xl text-gray-600"
            />
          </div>

          {/* Role Selection */}
          <div className="w-full max-w-[500px] mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:flex  lg:justify-center ">
              {["JobSeekers", "Company"].map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`py-2 sm:py-3 px-4 sm:px-5 rounded-xl border shadow-sm text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 data-[selected=true]:bg-[#5c73db] data-[selected=true]:text-white`}
                  onClick={() => setSelectedRole(role)}
                  data-selected={selectedRole === role}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full max-w-[500px] h-14 sm:h-16 bg-[#7494ec] rounded-xl text-white text-lg sm:text-xl lg:text-2xl font-bold mt-6 sm:mt-8"
          >
            Register
          </button>
        </form>

        {/* Sliding Overlay */}
        {/* Desktop (left-right) */}
        <motion.div
          animate={{ x: isLogin ? "0%" : "100%", y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="hidden lg:flex absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#7494ec] to-[#5c73db] flex-col justify-center items-center text-white p-10 rounded-[50px]"
        >
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="loginOverlayDesktop"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
                  Hello, Welcome!
                </h1>
                <p className="text-lg lg:text-2xl mb-6">
                  Already have an account?
                </p>
                <button
                  onClick={() => setIsLogin(false)}
                  className="px-6 lg:px-8 py-3 lg:py-4 w-[75%] bg-[#5c73db] text-white border-2 text-lg lg:text-2xl font-bold rounded-2xl"
                >
                  Login <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="registerOverlayDesktop"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
                  Welcome Back!
                </h1>
                <p className="text-lg lg:text-2xl mb-6">
                  Don't have an account?
                </p>
                <button
                  onClick={() => setIsLogin(true)}
                  className="px-6 lg:px-8 py-3 lg:py-4 w-[75%] bg-[#5c73db] text-white border-2 text-lg lg:text-2xl font-bold rounded-2xl"
                >
                  <FontAwesomeIcon icon={faArrowLeft} /> Register
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile/Tablet (top-bottom) */}
        <motion.div
          animate={{ y: isLogin ? "0%" : "100%", x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="flex lg:hidden absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-[#7494ec] to-[#5c73db] flex-col justify-center items-center text-white p-6 rounded-[30px]"
        >
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="loginOverlayMobile"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-2xl sm:text-3xl font-extrabold mb-4">
                  Hello, Welcome!
                </h1>
                <p className="text-base sm:text-lg mb-4">
                  Already have an account?
                </p>
                <button
                  onClick={() => setIsLogin(false)}
                  className="px-6 py-3 w-[75%] bg-[#5c73db] text-white border-2 text-base sm:text-lg font-bold rounded-xl"
                >
                  Login <FontAwesomeIcon icon={faArrowDown} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="registerOverlayMobile"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-2xl sm:text-3xl font-extrabold mb-4">
                  Welcome Back!
                </h1>
                <p className="text-base sm:text-lg mb-4">
                  Don't have an account?
                </p>
                <button
                  onClick={() => setIsLogin(true)}
                  className="px-6 py-3 w-[75%] bg-[#5c73db] text-white border-2 text-base sm:text-lg font-bold rounded-xl"
                >
                  <FontAwesomeIcon icon={faArrowUp} /> Register
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
