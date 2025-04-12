import React from "react";
import TopSection from "./common/TopSection";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";

const EditResume = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="w-full max-w-7xl mx-auto py-4 px-5 h-full flex flex-col">
        <TopSection />
        <div className="flex flex-1 overflow-hidden gap-3 mt-2">
          {/* Left Form: start from top and scroll vertically if needed */}
          <div className="w-[400px] h-full overflow-y-auto scrollbar-hide">
            <div className="min-h-[200px] overflow-hidden">
              <ResumeForm />
            </div>
          </div>

          {/* Right Resume Preview: fixed height scroll till resume only */}
          <div className="w-[900px] h-full overflow-y-auto scrollbar-hide">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditResume;
