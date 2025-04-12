"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useResumeContext } from "@/context/resume-info-provider";
import { ResumeDataType } from "@/types/resume.type";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Form Steps
import PersonalInfoForm from "./forms/PersonalInfoForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import HobbiesForm from "./forms/HobbiesForm"; // ✅ ADDED
import SummaryForm from "./forms/SummaryForm";
import ExperienceForm from "./forms/ExperienceForm";
import CertificatesForm from "./forms/CertificatesForm";

const ResumeForm = () => {
  const { resumeInfo } = useResumeContext();
  const [activeFormIndex, setActiveFormIndex] = useState(1);

  const totalForms = 7; // ✅ UPDATED from 6 to 7

  const methods = useForm<ResumeDataType>({
    defaultValues: {
      personalInfo: {
        firstName: "",
        email: "",
        phone: "",
      },
      educations: [],
      skills: [],
      hobbies: [], // ✅ ADD this if you’re using global form state
      summary: "",
      experiences: [],
      certificates: [],
    },
  });

  const handleNext = () => {
    if (activeFormIndex < totalForms) {
      setActiveFormIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (activeFormIndex > 1) {
      setActiveFormIndex((prev) => prev - 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex-1 w-full lg:sticky lg:top-16">
        <div className="shadow-md rounded-md bg-white !border-t-primary !border-t-4 dark:bg-card dark:border dark:border-gray-800">
          <div className="flex items-center gap-1 px-3 justify-between border-b py-[7px] min-h-10">
            <div className="text-sm text-gray-500">
              Step {activeFormIndex} of {totalForms}
            </div>
            <div className="flex gap-2">
              {activeFormIndex > 1 && (
                <Button
                  variant="outline"
                  size="default"
                  className="!px-2 !py-1 !h-auto"
                  onClick={handlePrevious}
                >
                  <ArrowLeft size="16px" />
                  Previous
                </Button>
              )}
              <Button
                variant="outline"
                size="default"
                className="!px-2 !py-1 !h-auto"
                disabled={
                  activeFormIndex === totalForms ||
                  resumeInfo?.status === "archived"
                }
                onClick={handleNext}
              >
                Next
                <ArrowRight size="16px" />
              </Button>
            </div>
          </div>

          <div className="px-5 py-3 pb-5">
            {activeFormIndex === 1 && <PersonalInfoForm handleNext={handleNext} />}
            {activeFormIndex === 2 && <EducationForm handleNext={handleNext} />}
            {activeFormIndex === 3 && <SkillsForm handleNext={handleNext} />}
            {activeFormIndex === 4 && <HobbiesForm handleNext={handleNext} />} {/* ✅ ADDED */}
            {activeFormIndex === 5 && <SummaryForm handleNext={handleNext} />}
            {activeFormIndex === 6 && <ExperienceForm handleNext={handleNext} />}
            {activeFormIndex === 7 && <CertificatesForm />}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default ResumeForm;
