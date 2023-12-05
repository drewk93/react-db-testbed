import React, { useState } from 'react';
import axios from 'axios'

const App = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function loginFunc() {
    console.log("Working");
    console.log(formData.username, formData.password);
    axios.post('http://localhost:3000/login', {
      username: formData.username,
      password: formData.password,
    })
    .then(response => console.log(response.data))
    .catch(error => console.error('Error:', error));
  }

  return (
    <div>
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
    </div>
  );
};

export default App;