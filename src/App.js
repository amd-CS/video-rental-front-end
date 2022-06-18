import React, { Component } from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Switch } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import { Redirect } from "react-router-dom";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./components/logout";
import { getUser } from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    this.setState({ user: getUser() });
  }

  render() {
    const user = this.state.user;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            {/* <Route
              path="/movies/:id"
              render={(props) => {
                if (!user) return <Redirect to="/login" />;
                return <MovieForm {...props} user={user} />;
              }}
            /> */}
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Redirect from="/" exact to="/movies" />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
