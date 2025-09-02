import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const { login, register } = useContext(AuthContext);

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
        console.log(data);
      } else {
        const data = await login(email, password);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]">
      <div className="relative w-[1250px] h-[800px] bg-white overflow-hidden rounded-[50px] shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex">
        {/* Left Side - Login */}
        <form
          onSubmit={onSubmitHandler}
          className="w-1/2 h-full flex flex-col justify-center items-center bg-white text-[#333] p-8"
        >
          <h1 className="text-6xl font-bold text-center">Login</h1>

          <div className="relative flex mt-10 w-[500px]">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full h-18 px-5 pr-12 bg-[#eee] text-[24px] text-[#333] font-medium rounded-xl outline-none"
              type="email"
              value={email}
              placeholder="Email"
              required
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className=" absolute top-1/2 right-4 transform -translate-y-1/2 text-3xl"
            />
          </div>

          <div className="relative flex mt-6 w-[500px]">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full h-18 px-5 pr-14 bg-[#eee] text-[24px] text-[#333] font-medium rounded-xl outline-none"
              type="password"
              value={password}
              placeholder="Password"
              required
            />
            <FontAwesomeIcon
              icon={faLock}
              className="text-gray-600 absolute top-1/2 right-4 transform -translate-y-1/2 text-3xl"
            />
          </div>

          <button
            type="submit"
            className="w-[500px] h-18 bg-[#7494ec] rounded-xl text-white text-[24px] font-bold cursor-pointer mt-8"
          >
            Login
          </button>
        </form>

        {/* Right Side - Register */}
        <form
          onSubmit={onSubmitHandler}
          className="w-1/2 h-full flex flex-col justify-center items-center bg-white text-[#333] p-8"
        >
          <h1 className="text-6xl font-bold text-center">Register</h1>

          <div className="relative flex mt-10 w-[500px]">
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full h-18 px-5 pr-12 bg-[#eee] text-[24px] text-[#333] font-medium rounded-xl outline-none"
              type="text"
              value={name}
              placeholder="Name"
              required
            />
            <FontAwesomeIcon
              icon={faUser}
              className=" absolute top-1/2 right-4 transform -translate-y-1/2 text-3xl"
            />
          </div>

          <div className="relative flex mt-6 w-[500px]">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full h-18 px-5 pr-12 bg-[#eee] text-[24px] text-[#333] font-medium rounded-xl outline-none"
              type="email"
              value={email}
              placeholder="Email"
              required
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-3xl"
            />
          </div>

          <div className="relative flex mt-6 w-[500px]">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full h-18 px-5 pr-14 bg-[#eee] text-[24px] text-[#333] font-medium rounded-xl outline-none"
              type="password"
              value={password}
              placeholder="Password"
              required
            />
            <FontAwesomeIcon
              icon={faLock}
              className="text-gray-600 absolute top-1/2 right-4 transform -translate-y-1/2 text-3xl"
            />
          </div>
          {/* Role Selection */}
          <div className="mb-2 w-[90%] ml-[25%]">
            <div className="grid grid-cols-3 gap-3 mt-6">
              {["JobSeekers", "Company"].map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`py-3 px-5 rounded-xl border shadow-sm text-lg font-medium transition-all duration-300 hover:scale-105  data-[selected=true]:bg-[#5c73db] data-[selected=true]:text-white cursor-pointer`}
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
            className="w-[500px] h-18 bg-[#7494ec] rounded-xl text-white text-[24px] font-bold cursor-pointer mt-8"
          >
            Register
          </button>
        </form>

        {/* Sliding Overlay */}
        <motion.div
          animate={{ x: isLogin ? "0%" : "100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#7494ec] to-[#5c73db] flex flex-col justify-center items-center text-white p-10 rounded-[50px]"
        >
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="loginOverlay"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-5xl font-extrabold mb-4">
                  Hello, Welcome!
                </h1>
                <p className="text-[24px] mb-6">Already have an account?</p>
                <button
                  onClick={() => setIsLogin(false)}
                  className="px-8 py-4 w-[75%] bg-[#5c73db] text-[#fff] border-[2px] text-[24px] font-bold rounded-2xl cursor-pointer"
                >
                  Login
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="registerOverlay"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-5xl font-extrabold mb-4">Welcome Back!</h1>
                <p className="text-[24px] mb-6">Don't have an account?</p>
                <button
                  onClick={() => setIsLogin(true)}
                  className="px-8 py-4 w-[75%] bg-[#5c73db] text-[#fff] border-[2px] text-[24px] font-bold rounded-2xl cursor-pointer"
                >
                  Register
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
