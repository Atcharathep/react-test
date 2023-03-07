import React, { useState } from 'react';
import './App.css';
import logo from './images/logo_login.png';

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  interface FormDataType { username: string, password: string }
  const responseBody: FormDataType = { username: "", password: "" }

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    responseBody.username = username;
    responseBody.password = password;
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(responseBody)
      });
      const data = await response.json();
      // if (data.access_token) {
      //   console.log(data.access_token);
      // }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    // console.log(responseBody);
    // console.log(JSON.stringify(responseBody));
  }

  const inputChangeHandler = (setFunction: React.Dispatch<React.SetStateAction<string>>, event: React.ChangeEvent<HTMLInputElement>) => {
    setFunction(event.target.value)
  }

  return (
    <main className='form-singin'>
      <form onSubmit={onSubmitHandler}>
        <div className='header-title'>
          <img src={logo} alt="Logo-Login" />
          <h1 className='title'><b>Login</b>-MyApp</h1>
        </div>
        <div className='form-group'>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder='Username'
            autoComplete='off'
            onChange={(e) => inputChangeHandler(setUsername, e)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder='Password'
            autoComplete='off'
            value={password}
            onChange={(e) => inputChangeHandler(setPassword, e)}
          />
        </div>
        <button type="submit" id="submit">Login</button>
        <div className='footer'>
          <a href="https://www.google.co.th/?hl=th" target={'_blank'} rel='noreferrer'>Click To Google</a>
        </div>
      </form>
    </main>
  );
}

export default App;
