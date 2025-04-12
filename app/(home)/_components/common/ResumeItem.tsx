import React, { FC, useCallback, useMemo, useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  Dot,
  EllipsisVertical,
  FileText,
  Globe,
  Lock,
  Trash2,
  Edit,
} from "lucide-react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { StatusType } from "@/types/resume.type";
import { useQueryClient } from "@tanstack/react-query";

interface PropType {
  documentId: string;
  title: string;
  status: "archived" | "private" | "public";
  themeColor: string | null;
  thumbnail: string | null;
  updatedAt: string;
  onUpdateStatus: (id: string, status: StatusType) => Promise<void>;
}

const ResumeItem: FC<PropType> = ({
  documentId,
  status,
  title,
  themeColor,
  thumbnail,
  updatedAt,
  onUpdateStatus,
}) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient(); // ✅ correct usage inside the component

  const docDate = useMemo(() => {
    if (!updatedAt) return null;
    return format(new Date(updatedAt), "MMM dd, yyyy");
  }, [updatedAt]);

  const gotoDoc = useCallback(() => {
    router.push(`/dashboard/document/${documentId}/edit`);
  }, [router, documentId]);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  const handleMoveToTrash = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsUpdating(true);
    try {
      await onUpdateStatus(documentId, "archived");

      // Invalidate trash query after moving
      await queryClient.invalidateQueries({ queryKey: ["trashed-documents"] });

      toast({
        title: "Success",
        description: "Moved to trash successfully",
      });
    } catch (error) {
      console.error("Failed to move document to trash:", error);
      toast({
        title: "Error",
        description: "Failed to move to trash",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
      setShowMenu(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      role="button"
      className="cursor-pointer max-w-[164px] w-full border rounded-lg transition-all h-[197px]
                 hover:border-primary hover:shadow-md shadow-primary relative group"
      onClick={gotoDoc}
      style={{ borderColor: themeColor || "" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Edit Button (shown on hover) */}
      {isHovered && (
        <button
          className="absolute top-2 right-2 z-10 bg-white dark:bg-gray-800
                     p-1 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            gotoDoc();
          }}
        >
          <Edit size={16} className="text-primary" />
        </button>
      )}

      <div className="flex flex-col w-full h-full items-center rounded-lg justify-center bg-[#fdfdfd] dark:bg-secondary">
        {/* Thumbnail */}
        <div className="w-full flex flex-1 px-1 pt-2">
          <div className="w-full flex flex-1 bg-white dark:bg-gray-700 rounded-t-lg justify-center items-center h-[120px]">
            {thumbnail ? (
              <div className="relative w-full h-full rounded-t-lg overflow-hidden">
                <Image
                  fill
                  src={thumbnail}
                  alt={title}
                  className="w-full h-full object-contain object-center rounded-t-lg"
                />
              </div>
            ) : (
              <FileText size="30px" />
            )}
          </div>
        </div>

        {/* Body Content */}
        <div className="shrink w-full border-t pt-2 pb-[9px] px-[9px]">
          <div className="flex items-center justify-between">
            <h5 className="font-semibold text-sm mb-[2px] truncate block w-[120px]">
              {title}
            </h5>
            <div className="relative" ref={menuRef}>
              <button
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={handleMenuClick}
                disabled={isUpdating}
              >
                <EllipsisVertical size="20px" />
              </button>

              {/* Dropdown */}
              {showMenu && (
                <div
                  className="absolute right-0 top-6 bg-white dark:bg-gray-800 
                             shadow-lg rounded-md z-20 w-[120px] border dark:border-gray-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 
                               flex items-center gap-2 text-sm"
                    onClick={handleMoveToTrash}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Deleting..." : (<><Trash2 size={14} /> Delete</>)}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center !text-[12px] font-medium text-muted-foreground">
            <span className="flex items-center gap-[2px]">
              {status === "private" ? (
                <>
                  <Lock size="12px" />
                  Private
                </>
              ) : (
                <>
                  <Globe size="12px" className="text-primary" />
                  Public
                </>
              )}
            </span>
            <Dot size="15px" />
            <span>{docDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeItem;
