import instance from "../utils/axios";

function handleLogin(data) {
  return instance.post("/users/login", data);
}

function SyncStepService(data) {
  return instance.post("/users/sync", data);
}

function SynceStepServiceToLocal(userId) {
  return instance.get(`/users/synced_data/${userId}`);
}

export { handleLogin, SyncStepService, SynceStepServiceToLocal };
