import instance from "../utils/axios";

function handleLogin(data) {
  return instance.post("/users/login", data);
}

function SyncStepService(data) {
  return instance.post("/users/sync", data);
}

export { handleLogin, SyncStepService };
