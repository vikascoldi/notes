import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./home/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

const App = () => {
  const routes = (
    <Router>
      <Routes>
        <Route path="/dashboard" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
    </Router>
  );
  return <div>{routes}</div>;
};

export default App;
