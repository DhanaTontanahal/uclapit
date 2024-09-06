import React, { useState } from "react";
import "./App.css";
import HomeServices from "./components/HomeServices";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="App_UC">
      {!isLoggedIn ? (
        isSignup ? (
          <Signup />
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )
      ) : (
        <HomeServices />
      )}
      {!isLoggedIn && (
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Go to Login" : "Go to Signup"}
        </button>
      )}
    </div>
  );
}

export default App;
