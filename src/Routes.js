import { Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home">
        <Header />
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;
