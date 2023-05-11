import instance from "../utils/axios";

function handleLogin(data) {
  return instance.post("/users/login", data);
}

function SyncService(data) {
  return instance.post("/users/sync", data);
}

function SyncedServiceToLocal(userId) {
  return instance.get(`/users/synced_data/${userId}`);
}

export { handleLogin, SyncService, SyncedServiceToLocal };
