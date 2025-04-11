"use client";

import useGetDocument from "@/features/document/use-get-document-by-id";
import { ResumeDataType, PersonalInfoType } from "@/types/resume.type";
import { useParams } from "next/navigation";
import { createContext, useState, FC, useEffect, useContext } from "react";

type ResumeContextType = {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
  onUpdate: (data: ResumeDataType) => void;
};

export const ResumeInfoContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeInfoProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const param = useParams();
  const documentId = (param as { documentId?: string })?.documentId ?? "";

  const { data, isSuccess, isLoading, isError, refetch } = useGetDocument(documentId);
  const [resumeInfo, setResumeInfo] = useState<ResumeDataType>();

  useEffect(() => {
    if (isSuccess && data?.data) {
      const rawData = data.data as ResumeDataType;

      const personalInfo: PersonalInfoType | null = rawData.personalInfo
        ? {
            ...rawData.personalInfo,
            otherLinks: Array.isArray(rawData.personalInfo.otherLinks)
              ? rawData.personalInfo.otherLinks
              : [],
          }
        : null;

      const transformedData: ResumeDataType = {
        ...rawData,
        personalInfo,
        selectedTemplate: rawData.selectedTemplate ?? "template1",
      };

      setResumeInfo(transformedData);
    }
  }, [isSuccess, data]);

  const onUpdate = (data: ResumeDataType) => {
    // Ensure otherLinks is always a string[]
    const safeData: ResumeDataType = {
      ...data,
      personalInfo: data.personalInfo
        ? {
            ...data.personalInfo,
            otherLinks: Array.isArray(data.personalInfo.otherLinks)
              ? data.personalInfo.otherLinks
              : [],
          }
        : null,
    };

    setResumeInfo(safeData);
  };

  return (
    <ResumeInfoContext.Provider
      value={{
        resumeInfo,
        isSuccess,
        isLoading,
        isError,
        refetch,
        onUpdate,
      }}
    >
      {children}
    </ResumeInfoContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeInfoContext);
  if (!context) {
    throw new Error("useResumeContext must be used within a ResumeInfoProvider");
  }
  return context;
};
