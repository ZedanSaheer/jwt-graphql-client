import { useQuery } from "@apollo/client";
import {gql} from "apollo-boost"

const App = () => {
  const {data,loading} = useQuery(gql`
  {
    hello
  }
  `);

  if(loading){
    return <div>loading..</div>
  }

  return <div className="app">{JSON.stringify(data)}</div>;
};

export default App;
