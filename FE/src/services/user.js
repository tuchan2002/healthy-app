import instance from "../utils/axios";

function handleLogin(data) {
  return instance.post("/users/login", data);
}

export { handleLogin };
