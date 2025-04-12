"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";
import { AIChatSession } from "@/lib/google-ai-model";
import { generateThumbnail } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";
import { Loader, Sparkles } from "lucide-react";
import React, { useCallback, useState } from "react";

interface GeneratesSummaryType {
  fresher: string;
  mid: string;
  experienced: string;
}
const SUMMARY_CHAR_LIMIT = 501;

const getPrompt = (jobTitle: string) => `Job Title: ${jobTitle}. Based on this job title, generate a JSON object with three concise, complete resume summaries under the keys: fresher, mid, and experienced.

Each summary must:
- Be strictly limited to a maximum of 466 characters and minimum of 460 characters.
- Use ATS-friendly language with optimized keywords relevant to the job title.
- Reflect a personal tone that showcases specific programming languages, technologies, frameworks, and methodologies (do not leave placeholders).
- Highlight unique strengths, aspirations, collaboration experience, and industry alignment.

Return only valid JSON with no additional commentary.`;


const SummaryForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, onUpdate } = useResumeContext();

  const { mutateAsync, isPending } = useUpdateDocument();

  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummary, setAiGeneratedSummary] =
    useState<GeneratesSummaryType | null>(null);

    const handleChange = (e: { target: { value: string } }) => {
      let { value } = e.target;
      if (value.length > SUMMARY_CHAR_LIMIT) {
        value = value.slice(0, SUMMARY_CHAR_LIMIT); // prevent overflow
      }
      const resumeDataInfo = resumeInfo as ResumeDataType;
      const updatedInfo = {
        ...resumeDataInfo,
        summary: value,
      };
      onUpdate(updatedInfo);
    };
    

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (!resumeInfo) return;
      const thumbnail = await generateThumbnail();
      const currentNo = resumeInfo?.currentPosition
        ? resumeInfo?.currentPosition + 1
        : 1;

      await mutateAsync(
        {
          currentPosition: currentNo,
          thumbnail: thumbnail,
          summary: resumeInfo?.summary,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Summary updated successfully",
            });
            handleNext();
          },
          onError() {
            toast({
              title: "Error",
              description: "Failed to update summary",
              variant: "destructive",
            });
          },
        }
      );
    },
    [resumeInfo]
  );

  const GenerateSummaryFromAI = async () => {
    try {
      const jobTitle = resumeInfo?.personalInfo?.jobTitle;
      if (!jobTitle) {
        toast({
          title: "Error",
          description: "Please fill in 'Field of Apply' in Personal Information first",
          variant: "destructive",
        });
        return;
      }
      setLoading(true);
      const PROMPT = getPrompt(jobTitle);
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      console.log(responseText);
      setAiGeneratedSummary(JSON?.parse(responseText));
    } catch (error) {
      toast({
        title: "Failed to generate summary",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = useCallback(
    (summary: string) => {
      if (!resumeInfo) return;
      const resumeDataInfo = resumeInfo as ResumeDataType;
      const updatedInfo = {
        ...resumeDataInfo,
        summary: summary,
      };
      onUpdate(updatedInfo);
      setAiGeneratedSummary(null);
    },
    [onUpdate, resumeInfo]
  );

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Summary</h2>
        <p className="text-sm">Add summary for your resume</p>
        {resumeInfo?.personalInfo?.jobTitle && (
          <p className="text-sm text-muted-foreground mt-1">
            Generating summary for: {resumeInfo.personalInfo.jobTitle}
          </p>
        )}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-end justify-between">
            <Label>Add Summary</Label>
            <Button
              variant="outline"
              type="button"
              className="gap-1"
              disabled={loading || isPending || !resumeInfo?.personalInfo?.jobTitle}
              onClick={() => GenerateSummaryFromAI()}
            >
              {loading ? (
                <Loader size="15px" className="animate-spin" />
              ) : (
                <Sparkles size="15px" className="text-purple-500" />
              )}
              Generate with AI
            </Button>
          </div>
          <Textarea
  className="mt-5 min-h-36"
  required
  maxLength={SUMMARY_CHAR_LIMIT}
  value={resumeInfo?.summary || ""}
  onChange={handleChange}
  placeholder={
    !resumeInfo?.personalInfo?.jobTitle
      ? "Please fill in 'Field of Apply' in Personal Information to generate AI suggestions"
      : "Enter your professional summary"
  }
/>
<p className="text-xs text-muted-foreground text-right mt-1">
  {resumeInfo?.summary?.length || 0}/{SUMMARY_CHAR_LIMIT} characters
</p>


          {aiGeneratedSummary && (
            <div>
              <h5 className="font-semibold text-[15px] my-4">Suggestions</h5>
              {Object?.entries(aiGeneratedSummary)?.map(
                ([experienceType, summary], index) => (
                  <Card
                    role="button"
                    key={index}
                    className="my-4 bg-primary/5 shadow-none
                            border-primary/30
                          "
                    onClick={() => handleSelect(summary)}
                  >
                    <CardHeader className="py-2">
                      <CardTitle className="font-semibold text-md">
                        {experienceType?.charAt(0)?.toUpperCase() +
                          experienceType?.slice(1)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>{summary}</p>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          )}

          <Button
            className="mt-4"
            type="submit"
            disabled={
              isPending || loading || resumeInfo?.status === "archived"
                ? true
                : false
            }
          >
            {isPending && <Loader size="15px" className="animate-spin" />}
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SummaryForm;