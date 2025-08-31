import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]">
      <div className="w-[1050px] h-[675px] bg-[#fff] overflow-hidden rounded-4xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex">
        <div className="w-1/2 h-full flex flex-col justify-center items-center bg-white text-[#333]">
          <form className="w-[450px] flex flex-col ">
            <h1 className="text-5xl font-bold text-center">Login</h1>

            <div className="relative flex mt-10">
              <input
                className="w-full h-15 px-5 pr-12 bg-[#eee] text-[20px] text-[#333] font-medium rounded-xl outline-none"
                type="email"
                placeholder="Email"
                required
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-500 absolute top-1/2 right-5 transform -translate-y-1/2 text-2xl"
              />
            </div>

            <div className="relative flex mt-8">
              <input
                className="w-full h-15 px-5 pr-14 bg-[#eee] text-[20px] text-[#333] font-medium rounded-xl outline-none"
                type="password"
                placeholder="Password"
                required
              />
              <FontAwesomeIcon
                icon={faLock}
                className="text-gray-500 absolute top-1/2 right-5 transform -translate-y-1/2 text-2xl"
              />
            </div>

            <button className="w-full h-14 bg-[#7494ec] rounded-[8px] text-[#fff] text-[22px] font-bold cursor-pointer mt-8">
              Login
            </button>
          </form>
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center items-center bg-white text-[#333]">
          <form className="w-[450px] flex flex-col">
            <h1 className="text-5xl font-bold text-center">Register</h1>
            <div className="relative flex mt-10">
              <input
                className="w-full h-15 px-5 pr-12 bg-[#eee] text-[20px] text-[#333] font-medium rounded-xl outline-none"
                type="name"
                placeholder="Name"
                required
              />
              <FontAwesomeIcon
                icon={faUser}
                className="text-gray-500 absolute top-1/2 right-5 transform -translate-y-1/2 text-2xl"
              />
            </div>
            <div className="relative flex mt-7">
              <input
                className="w-full h-15 px-5 pr-12 bg-[#eee] text-[20px] text-[#333] font-medium rounded-xl outline-none"
                type="email"
                placeholder="Email"
                required
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-500 absolute top-1/2 right-5 transform -translate-y-1/2 text-2xl"
              />
            </div>
            <div className="relative flex mt-7">
              <input
                className="w-full h-15 px-5 pr-14 bg-[#eee] text-[20px] text-[#333] font-medium rounded-xl outline-none"
                type="password"
                placeholder="Password"
                required
              />
              <FontAwesomeIcon
                icon={faLock}
                className="text-gray-500 absolute top-1/2 right-5 transform -translate-y-1/2 text-2xl"
              />
            </div>
            <button className="w-full h-14 bg-[#7494ec] rounded-[8px] text-[#fff] text-[22px] font-bold cursor-pointer mt-7">
              Register
            </button>
          </form>
        </div>
        <div className="absolute h-full w-full">
          <div>
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button>Register</button>
          </div>
          <div>
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
