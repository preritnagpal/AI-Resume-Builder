import React from "react";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { ResumeDataType, CertificateType } from "@/types/resume.type";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const CertificatePreview: React.FC<PropsType> = ({ resumeInfo, isLoading }) => {
  const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;

  const certificates: CertificateType[] = resumeInfo?.certificates || [];

  if (isLoading || !certificates.length) return null;

  return (
    <div className="w-full my-5">
      <h5 className="text-center font-bold mb-2" style={{ color: themeColor }}>
        Certifications
      </h5>
      <hr className="border-[1.5px] my-2" style={{ borderColor: themeColor }} />

      <ul className="list-disc ml-6 text-[13px] space-y-1">
        {certificates.map((cert: CertificateType, index: number) => (
          <li key={cert.id || index}>
            {cert.name}
            {cert.issuer && ` – ${cert.issuer}`}
            {cert.year && ` (${cert.year})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CertificatePreview;
