import instance from "../utils/axios";

const handleGetUserTarget = (userId) => {
  return instance.get(`/user-targets/user-id/${userId}`);
};

const handlePostUserTarget = (data) => {
  return instance.post("/user-targets", data);
};

const handlePutUserTarget = (data) => {
  return instance.put("/user-targets/edit", data);
};

export { handleGetUserTarget, handlePostUserTarget, handlePutUserTarget };
