import React, { useState } from "react";
import { useHistory } from "react-router";
import { useLoginMutation } from "../generated/graphql";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [login] = useLoginMutation();
  const history = useHistory();

  return (
    <div>
      <br />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("form submitted!");
          const response = await login({
            variables: {
              email,
              password,
            },
          });
          console.log(response);
          history.push("/");
        }}
      >
        <div>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
