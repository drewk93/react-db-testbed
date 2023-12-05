import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


const App = () => {
  const [formData, setFormData] = useState({ username: '', password: '' }); // State of client inputs
  const [result, setResult] = useState('Welcome!'); // State to hold login result

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const domain = "http://localhost:3000"

  function loginFunc() {
    console.log(formData.username, formData.password);
    axios.post(`${domain}/login`, {
      username: formData.username,
      password: formData.password,
    })
    .then(response => {
      console.log(response.data)
      setResult('Login Successful!'); // Set the login result
    })
    .catch(error => {
      console.error('Error:', error)
      setResult('Login Failed!'); // Set the login result
    });
  }

  function registerFunc() {
    console.log(formData.username, formData.password);
    axios.post(`${domain}/register`, {
      username: formData.username,
      password: formData.password
    })
    .then(response => {
      setResult('Registration Successful!')
    })
    .catch(error => {
      setResult('Registration Failed!')
    })
  }

  return (
    <div id="mainContainer">
      <div id="loginContainer">
        <div id="inputContainer">
          <input
            type="text"
            value={formData.username}
            name="username"
            placeholder="username"
            autoComplete="off"
            onChange={handleInputChange}
          ></input>
          <input
            type="password"
            value={formData.password}
            name="password"
            placeholder="password"
            autoComplete="off"
            onChange={handleInputChange}
          ></input>
          <button id="submitLogin" className="btn" type="submit" onClick={loginFunc}>
            Login
          </button>
          <button id="register" className="btn" type="submit" onClick={registerFunc}>
            Register
          </button>
        </div>
        <div id="resultContainer">
          <h1>{result}</h1> {/* Display the login result */}
        </div>
      </div>
    </div>
  );
};

export default App;