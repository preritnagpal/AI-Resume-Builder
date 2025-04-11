// use-delete-document.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const deleteDocument = async (documentId: string) => {
  const response = await axios.delete(`/api/document/${documentId}`);
  return response.data;
};

const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,
    onMutate: async (documentId) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: ["documents"] });

      // Snapshot previous data
      const previousDocuments = queryClient.getQueryData(["documents", true]);

      // Optimistically update trash list
      queryClient.setQueryData(["documents", true], (old: any) => 
        old?.filter((doc: any) => doc.documentId !== documentId)
      );

      return { previousDocuments };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(["documents", true], context?.previousDocuments);
      
      toast({
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : "Failed to delete document",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      // Invalidate all document-related queries
      queryClient.invalidateQueries({ 
        queryKey: ["documents"],
        exact: false,
      });
    },
    onSettled: () => {
      // Force refresh of trash list
      queryClient.invalidateQueries({ 
        queryKey: ["documents", true],
        exact: true,
      });
    }
  });
};

export default useDeleteDocument;