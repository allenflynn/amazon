import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signIn } from "../redux/actions";

const SigninScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const stateUser = useSelector((state) => state.stateUser);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (stateUser.user) {
      props.history.push(redirect);
    }
    if (stateUser.error) {
      alert(stateUser.error);
    }
  }, [stateUser.user]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign in</h1>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Email password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <button className="primary" type="submit">
            Sign in
          </button>
        </div>
        <div>
          New customer ? <Link to="/register">Create your account</Link>
        </div>
      </form>
    </div>
  );
};

export default SigninScreen;
