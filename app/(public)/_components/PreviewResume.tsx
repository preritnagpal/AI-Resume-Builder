import React from "react";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";
import { cn } from "@/lib/utils";

// Components
import PersonalInfo from "@/components/preview/PersonalInfo";
import SummaryPreview from "@/components/preview/SummaryPreview";
import EducationPreview from "@/components/preview/EducationPreview";
import ExperiencePreview from "@/components/preview/ExperiencePreview";
import SkillPreview from "@/components/preview/SkillPreview";
import CertificatePreview from "@/components/preview/CertificatePreview";
import HobbyPreview from "@/components/preview/HobbyPreview";

type Props = {
  isLoading: boolean;
  resumeInfo: ResumeDataType;
};

const PreviewResume: React.FC<Props> = ({ isLoading, resumeInfo }) => {
  const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;

  return (
    <div
      className={cn(`
        shadow-lg !bg-white w-full flex-[1.02]
        h-full p-10 !font-open-sans
        !text-black
      `)}
      style={{
        borderTop: `13px solid ${themeColor}`,
      }}
    >
      {/* Personal Info */}
      <PersonalInfo isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* Summary */}
      <SummaryPreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* Experience */}
      <ExperiencePreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* Education */}
      <EducationPreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* Skills */}
      <SkillPreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* Certificates */}
      <CertificatePreview isLoading={isLoading} resumeInfo={resumeInfo} />

      {/* Hobbies */}
      <HobbyPreview isLoading={isLoading} resumeInfo={resumeInfo} />
    </div>
  );
};

export default PreviewResume;
