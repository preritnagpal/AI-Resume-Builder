"use client";

import React, { useState } from "react";
import AddResume from "../_components/AddResume";
import ResumeList from "../_components/ResumeList";
import TrashListBox from "../_components/TrashListBox";
import { Button } from "@/components/ui/button";
import { useResumeContext, ResumeInfoProvider } from "@/context/resume-info-provider";

const TemplateCard = ({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) => (
  <div
    className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <h3 className="font-medium text-lg mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
    <div className="mt-4 h-40 bg-gray-100 rounded-md flex items-center justify-center">
      <span className="text-gray-500">Template Preview</span>
    </div>
    <Button className="w-full mt-4">Use Template</Button>
  </div>
);

const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState<"resumes" | "templates">("resumes");
  const { resumeInfo, onUpdate } = useResumeContext();

  return (
    <div className="w-full">
      <div className="w-full mx-auto max-w-7xl py-5 px-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Resume Builder</h1>
            <p className="text-base dark:text-inherit">
              Create your own custom resume with AI
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <TrashListBox />
          </div>
        </div>

        <div className="w-full pt-11">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant={activeTab === "resumes" ? "default" : "ghost"}
              onClick={() => setActiveTab("resumes")}
              className="px-6"
            >
              My Resumes
            </Button>
            <Button
              variant={activeTab === "templates" ? "default" : "ghost"}
              onClick={() => setActiveTab("templates")}
              className="px-6"
            >
              Templates
            </Button>
          </div>

          {activeTab === "resumes" ? (
            <div className="flex flex-wrap w-full gap-5">
              <AddResume />
              <ResumeList />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <TemplateCard
                title="Professional"
                description="Clean and modern design"
                onClick={() => {
                  if (resumeInfo) {
                    onUpdate({ ...resumeInfo, selectedTemplate: "template1" });
                    setActiveTab("resumes");
                  }
                }}
              />

              <TemplateCard
                title="Creative"
                description="For design-oriented fields"
                onClick={() => {
                  if (resumeInfo) {
                    onUpdate({ ...resumeInfo, selectedTemplate: "template2" });
                    setActiveTab("resumes");
                  }
                }}
              />

              <TemplateCard
                title="Minimalist"
                description="Simple and elegant"
                onClick={() => {
                  if (resumeInfo) {
                    onUpdate({ ...resumeInfo, selectedTemplate: "template3" });
                    setActiveTab("resumes");
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Page = () => (
  <ResumeInfoProvider>
    <DashboardContent />
  </ResumeInfoProvider>
);

export default Page;
