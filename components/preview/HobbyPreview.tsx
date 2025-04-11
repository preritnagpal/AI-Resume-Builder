import React from "react";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const HobbyPreview: React.FC<PropsType> = ({ resumeInfo, isLoading }) => {
  const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;

  if (isLoading || !resumeInfo?.hobbies?.length) return null;

  return (
    <div className="w-full my-5">
      <h5 className="text-center font-bold mb-2" style={{ color: themeColor }}>
        Hobbies
      </h5>
      <hr className="border-[1.5px] my-2" style={{ borderColor: themeColor }} />

      <ul className="list-disc ml-6 text-[13px] space-y-1">
        {resumeInfo.hobbies.map((hobby, index) => (
          <li key={hobby.id || index}>{hobby.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HobbyPreview;
