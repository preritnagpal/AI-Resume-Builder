"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import useGetDocuments from "@/features/document/use-get-document";
import useRestoreDocument from "@/features/document/use-restore-document";
import useDeleteDocument from "@/features/document/use-delete-document";
import useClearTrash from "@/features/document/use-clear-trash";
import { format } from "date-fns";
import { Dot, FileText, Undo, Loader, Search, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


interface Document {
  id: string;
  documentId: string;
  title: string;
  status: string;
  updatedAt: string;
}

const TrashListBox = () => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useGetDocuments(true);
  const { mutateAsync: restoreDoc } = useRestoreDocument();
  const { mutateAsync: deleteDoc } = useDeleteDocument();
  const { mutate: clearTrash, isPending: isClearing } = useClearTrash();

  const resumes = data?.data ?? [];
  const [search, setSearch] = useState("");
  const [restoringDocId, setRestoringDocId] = useState<string | null>(null);
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);

  const filteredDocuments = resumes?.filter((doc) => {
    return doc.title?.toLowerCase()?.includes(search?.toLowerCase());
  });

  const onClick = (docId: string) => {
    router.push(`/dashboard/document/${docId}/edit`);
  };

  const onRestore = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    docId: string,
    status: string
  ) => {
    event.stopPropagation();
    setRestoringDocId(docId);
    try {
      await restoreDoc(
        {
          documentId: docId,
          status: status,
        },
        {
          onSuccess: async () => {
            toast({
              title: "Success",
              description: "Document restored successfully",
              variant: "default",
            });
            await refetch();
          },
          onError: () => {
            toast({
              title: "Error",
              description: "Failed to restore document",
              variant: "destructive",
            });
          },
        }
      );
    } catch (error) {
      console.error("Restore error:", error);
    } finally {
      setRestoringDocId(null);
    }
  };

  const onDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    docId: string
  ) => {
    event.stopPropagation();
    setDeletingDocId(docId);
    try {
      await deleteDoc(docId);
      toast({
        title: "Success",
        description: "Document permanently deleted",
        variant: "default",
      });
      await refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
      console.error("Delete error:", error);
    } finally {
      setDeletingDocId(null);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-red-500">Error loading trash items</p>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="text-[15px] gap-[2px] items-center" variant="outline">
          <Trash2 size="15px" />
          <span>All Trash</span>
          {resumes.length > 0 && (
            <span className="ml-1 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
              {resumes.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background w-[22rem] !px-2 max-h-[400px] overflow-y-auto"
        align="end"
        alignOffset={0}
        forceMount
      >
        {isLoading ? (
          <div className="w-full flex flex-col gap-2 pt-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        ) : (
          <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2 sticky top-0 bg-background z-10">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 px-2 bg-secondary"
                placeholder="Filter by resume title"
              />
            </div>

            <div className="mt-2 px-1 pb-1">
              {filteredDocuments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <FileText className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    {search ? "No matching documents found" : "Trash is empty"}
                  </p>
                </div>
              ) : (
                filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    role="button"
                    onClick={() => onClick(doc.documentId)}
                    className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center justify-between py-2 px-2 group"
                  >
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <FileText
                        size="16px"
                        className="mt-[3px] flex-shrink-0 text-muted-foreground"
                      />
                      <div className="flex flex-col min-w-0">
                        <h5 className="font-medium text-sm truncate">
                          {doc.title}
                        </h5>
                        <div className="flex items-center !text-[12px] text-muted-foreground">
                          <span className="flex items-center capitalize gap-[2px]">
                            {doc.status}
                          </span>
                          <Dot size="15px" />
                          <span>
                            {doc.updatedAt &&
                              format(new Date(doc.updatedAt), "MMM dd, yyyy")
                              .toLowerCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <div
                        role="button"
                        onClick={(e) => onRestore(e, doc.documentId, doc.status)}
                        className="rounded-sm hover:bg-neutral-200 w-7 h-7 flex items-center justify-center dark:hover:bg-gray-700 text-muted-foreground hover:text-primary"
                        title="Restore"
                      >
                        {restoringDocId === doc.documentId ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          <Undo className="h-4 w-4" />
                        )}
                      </div>
                      <div
                        role="button"
                        onClick={(e) => onDelete(e, doc.documentId)}
                        className="rounded-sm hover:bg-neutral-200 w-7 h-7 flex items-center justify-center dark:hover:bg-gray-700 text-muted-foreground hover:text-destructive"
                        title="Delete permanently"
                      >
                        {deletingDocId === doc.documentId ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {resumes.length > 0 && (
          <div className="flex justify-end px-2 pb-2">
            <Button
              size="sm"
              variant="destructive"
              onClick={async () => {
                await clearTrash();
                await refetch();
              }}
              disabled={isClearing}
            >
              {isClearing ? (
                <>
                  <Loader className="h-4 w-4 animate-spin mr-1" />
                  Clearing...
                </>
              ) : (
                "Clear All"
              )}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default TrashListBox;
