import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


const App = () => {
  const [formData, setFormData] = useState({ username: '', password: '' }); // State of client inputs
  const [result, setResult] = useState('Welcome!'); // State to hold login result

  function handleInputChange(event) {
    const { name, value } = event.target; // input values equal the event.target
    setFormData({ ...formData, [name]: value }); // setFormData to equal the name, and value imported from the input
  }

  const domain = "http://localhost:3000" //domain/url set to localhost:3000

  function loginFunc() {
    axios.post(`${domain}/login`, {
      username: formData.username, // import username from input value;
      password: formData.password, // imported password from input value;
    })
    .then(response => {
      console.log(response.data)
      setResult('Login Successful!'); // Set the login result
    })
    .catch(error => {
      console.error('Error:', error.response.data.message)
      setResult('Login Failed!'); // Set the login result
    });
  }

  function registerFunc() {
   
    axios.post(`${domain}/register`, {
      username: formData.username, // import username from input value;
      password: formData.password // imported password from input value;
    })
    .then(response => {
      console.log(response.data)
      setResult('Registration Successful!'); // Set the registration result
    })
    .catch(error => {
      console.error('Error:', error.response.data.message);
      setResult('Registration Failed!'); // Set the registration result
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