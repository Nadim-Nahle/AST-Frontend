import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";

export const useCreateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.post("/users", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};
