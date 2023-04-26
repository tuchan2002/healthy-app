import instance from "../utils/axios";

const handleGetBMI = (userId) => {
  return instance.get(`/bmi/user-id/${userId}`);
};

const handlePostBMI = (data) => {
  return instance.post("/bmi", data);
};

export { handleGetBMI, handlePostBMI };
