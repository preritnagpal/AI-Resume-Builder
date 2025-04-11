// use-clear-trash.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

// Function to call API and clear all trash
const clearAllTrash = async () => {
  const response = await axios.delete("/api/document/clear-trash");
  return response.data;
};

// Hook to perform trash clearing and cache invalidation
const useClearTrash = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearAllTrash,
    onSuccess: () => {
      // ✅ Invalidate trash documents query
      queryClient.invalidateQueries({ queryKey: ["documents", true] });

      toast({
        title: "Success",
        description: "All trash documents deleted",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear trash",
        variant: "destructive",
      });
    },
  });
};

export default useClearTrash;
