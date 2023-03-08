import React, { useState } from "react";
import "./App.css";
import logo from "./images/logo_login.png";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  interface FormDataType {
    username: string;
    password: string;
  }

  const responseBody: FormDataType = { username: "", password: "" };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    responseBody.username = username;
    responseBody.password = password;
    try {
      const config = {
        method: "post",
        url: "http://localhost:3001/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(responseBody),
      };
      const response = await axios(config);
      console.log(response);
    } catch (error: any) {
      console.log(error.response || error);
    }
  };

  const inputChangeHandler = (
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFunction(event.target.value);
  };

  return (
    <main className="form-singin">
      <form onSubmit={onSubmitHandler}>
        <div className="header-title">
          <img src={logo} alt="Logo-Login" />
          <h1 className="title">
            <b>Login</b>-MyApp
          </h1>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            autoComplete="off"
            onChange={(e) => inputChangeHandler(setUsername, e)}
            minLength={4}
            maxLength={16}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => inputChangeHandler(setPassword, e)}
            minLength={4}
            maxLength={16}
            required
          />
        </div>
        <button type="submit" id="submit">
          Login
        </button>
        <div className="footer">
          <a
            href="https://www.google.co.th/?hl=th"
            target={"_blank"}
            rel="noreferrer"
          >
            Click To Google
          </a>
        </div>
      </form>
    </main>
  );
}

export default App;
