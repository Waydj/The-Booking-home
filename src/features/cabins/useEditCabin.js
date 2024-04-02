import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ cabin, id }) => createEditCabin(cabin, id),
    onSuccess: () => {
      toast.success("Cabin update successfully");
      queryClient.invalidateQueries({
        queryKey: "cabins",
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, editCabin };
};
