import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { Redirect } from "react-router-dom";
import { login } from "../services/authService";
import { getUser } from "../services/authService";
import axios from "axios";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  username = React.createRef();

  doSubmit = async () => {
    try {
      const { data } = this.state;
      // const {data:jwt} = await login(data.username, data.password);
      const { data: jwt } = await axios.post("http://localhost:3900/api/auth", {
        email: data.username,
        password: data.password,
      });
      console.log(jwt);
      localStorage.setItem("token", jwt);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
      }
    }
  };

  render() {
    if (getUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
