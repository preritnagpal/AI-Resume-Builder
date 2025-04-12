"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import useGetDocument from "@/features/document/use-get-document-by-id";
import { ResumeDataType, CertificateType } from "@/types/resume.type"; // Make sure to import CertificateType
import Error from "../../../_components/Error";
import PreviewResume from "../../../_components/PreviewResume";

const PublicResume = () => {
  const param = useParams();
  const documentId = param.documentId as string;
  const { data, isSuccess, isLoading } = useGetDocument(documentId, true);

  // Safely transform API response to ResumeDataType
  const transformResumeData = (apiData: any): ResumeDataType => {
    if (!apiData) {
      return {
        title: "Untitled Resume",
        status: "public",
        certificates: [],
        experiences: [],
        educations: [],
        skills: [],
        hobbies: [],
        personalInfo: undefined
      };
    }

    return {
      ...apiData,
      // Handle potentially missing arrays
      certificates: (apiData.certificates || []).map((cert: any) => ({
        ...cert,
        certHeading: cert.certHeading ?? undefined
      })),
      experiences: apiData.experiences || [],
      educations: apiData.educations || [],
      skills: apiData.skills || [],
      hobbies: apiData.hobbies || [],
      // Handle personalInfo with defaults
      personalInfo: apiData.personalInfo ? {
        ...apiData.personalInfo,
        otherLinks: apiData.personalInfo.otherLinks || []
      } : undefined,
      // Convert null to undefined for certHeading
      certHeading: apiData.certHeading ?? undefined
    };
  };

  const resumeInfo = transformResumeData(data?.data);

  if (!isLoading && !isSuccess) {
    return <Error />;
  }

  return (
    <div className="w-full min-h-screen h-auto bg-black">
      <nav className="w-full px-8 border-b sticky top-0 border-gray-700 bg-black/50 h-12 py-2">
        <div className="flex items-center gap-1">
          <Image
            src="/images/pdf_icon.png"
            width={20}
            height={20}
            alt="pdf logo"
          />
          <h5 className="text-[20px] px-1 text-gray-300 font-semibold">
            {resumeInfo.title}.pdf
          </h5>
        </div>
      </nav>
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="max-w-[90%] mx-auto lg:max-w-[50%] w-full bg-white">
          <PreviewResume
            resumeInfo={resumeInfo}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default PublicResume;