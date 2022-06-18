import http from "./httpServices";

const apiEndpoint = "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    passowrd: user.passowrd,
    name: user.name,
  });
}
