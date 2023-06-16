import React, { useState } from "react";
import logo from './logo_german_mastery.jpg';
import './App.css';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import Quiz from "./components/Quiz";

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const handleRegister = () => {
    setCurrentForm('login');
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isLoggedIn ? (
          <Quiz />
        ) : (
          currentForm === "login" ? (
            <Login onFormSwitch={toggleForm} onLogin={handleLogin} />
          ) : (
            <Register onFormSwitch={toggleForm} onRegister={handleRegister} />
          )
        )}
      </header>
    </div>
  );
}

export default App;
