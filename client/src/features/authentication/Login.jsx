import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await axios({
      method: "post",
      url: "http://127.0.0.1:3000/api/v1/users/login",
      data: {
        email: email,
        password: password,
      },
    });

    if (res.statusText === "OK") toast.success("Logged in successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Enter your email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="email"
          id="email"
        />
      </div>

      <div>
        <label htmlFor="password">Enter your password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  );
}

export default Login;
