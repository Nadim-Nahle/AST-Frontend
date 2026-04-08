import api from "./axios";

export const fetchUsers = async (page: number, limit: number) => {
  const res = await api.get(`/users?page=${page}&limit=${limit}`);
  return res.data;
};
