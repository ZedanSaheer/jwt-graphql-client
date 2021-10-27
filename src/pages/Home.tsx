import React from "react";
import { useUsersQuery } from "../generated/graphql";

const Home = () => {
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />
      Users :
      <br />
      <ul>
        {data.users.map((user) => (
          <div key={user.id}>
            <li>
              {user.id} : {user.email}
            </li>
            <br />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Home;
