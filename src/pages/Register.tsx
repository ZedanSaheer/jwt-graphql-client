import React, { useState } from "react";
import { useHistory } from "react-router";
import { useRegisterMutation } from "../generated/graphql";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [register] = useRegisterMutation();
  const history = useHistory();

  return (
    <div>
      <br />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("form submitted!");
          const response = await register({
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
