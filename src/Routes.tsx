import { useHelloQuery } from "./generated/graphql";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

const Routes = () => {
  const { data, loading } = useHelloQuery();

  if (loading || !data) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <BrowserRouter>
        <div>
          <header>
            <Link to="/register">Register</Link><br />
            <Link to="/login">Login</Link><br />
            <Link to="/">Home</Link><br />
          </header>
        </div>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
