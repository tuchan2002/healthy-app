import instance from "../utils/axios";

const handleGetUserTarget = (userId) => {
  return instance.get(`/user-targets/user-id/${userId}`);
};

const handlePostUserTarget = (data) => {
  return instance.post("/user-targets", data);
};

export { handleGetUserTarget, handlePostUserTarget };
