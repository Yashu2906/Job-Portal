import React from "react";

const Login = () => {
  return (
    <div className="main">
      <div className="login">
        <form>
          <p>Login</p>
          <div>
            <input type="email" placeholder="Email" required></input>
            <input type="password" placeholder="Password" required></input>
          </div>
          <div>
            <button>Log In</button>
          </div>
        </form>
      </div>
      <div>
        <form>
          <p>Register</p>
          <div>
            <input type="text" placeholder="Name" required></input>
            <input type="email" placeholder="Email" required></input>
            <input type="password" placeholder="Password" required></input>
            <div>
              <label htmlFor="roles">Role </label>
              <select name="role">
                <option value="Jobseekers">Jobseekers</option>
                <option value="Company">Company</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div>
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
  );
};

export default Login;
