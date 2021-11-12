import React, { useState, useContext, useEffect } from "react";

import { Link } from "react-router-dom";
// custom tools
import UserContext from "./../../auth/UserContext";
import APIHandler from "./../../api/handler";

export default function Signin(props) {
  const [email, setEmail] = useState("admin@foobarbaz.io");
  const [password, setPassword] = useState("12345");
  const { setCurrentUser, currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) props.history.push("/dashboard");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiRes = await APIHandler.post("/signin", { email, password });
      setCurrentUser(apiRes.data.currentUser);
      props.history.push("/dashboard"); // redirect to dashboard
    } catch (err) {
      setCurrentUser(null);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="title">Signin</h1>
      <label className="label" htmlFor="email">
        email
      </label>
      <input
        className="input"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="label" htmlFor="password">
        password
      </label>
      <input
        className="input"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn">ok</button>
      <p className="parag">
        No account yet ? please{" "}
        <Link to="/signup" className="link">
          signup
        </Link>
      </p>
    </form>
  );
}
