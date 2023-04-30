import instance from "../utils/axios";

const handleGetTargetStates = (userId) => {
  return instance.get(`/user-target-states/current-week/user-id/${userId}/get`);
};

export { handleGetTargetStates };
