'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "@/context/resume-info-provider";
import { AIChatSession } from "@/lib/google-ai-model";
import { ResumeDataType } from "@/types/resume.type";
import { Loader, Sparkles } from "lucide-react";
import React, { useCallback, useState } from "react";
import { toast } from "@/hooks/use-toast";

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

const SummaryForm = () => {
  const { resumeInfo, onUpdate } = useResumeContext();
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState<GeneratesSummaryType | null>(null);
  const [jobTitle, setJobTitle] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = e.target;
    if (value.length > SUMMARY_CHAR_LIMIT) {
      value = value.slice(0, SUMMARY_CHAR_LIMIT);
    }
    const resumeDataInfo = resumeInfo as ResumeDataType;
    const updatedInfo = {
      ...resumeDataInfo,
      summary: value,
    };
    onUpdate(updatedInfo);
  };

  const GenerateSummaryFromAI = async () => {
    try {
      if (!jobTitle.trim()) {
        toast({
          title: "Error",
          description: "Please enter a job title first",
          variant: "destructive",
        });
        return;
      }
      setLoading(true);
      const PROMPT = getPrompt(jobTitle);
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      setAiGeneratedSummary(JSON.parse(responseText));
    } catch (error) {
      toast({
        title: "Failed to generate summary",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = useCallback((summary: string) => {
    if (!resumeInfo) return;
    const resumeDataInfo = resumeInfo as ResumeDataType;
    const updatedInfo = {
      ...resumeDataInfo,
      summary: summary,
    };
    onUpdate(updatedInfo);
    setAiGeneratedSummary(null);
  }, [onUpdate, resumeInfo]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Job Title</Label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter your target job title (e.g. 'Frontend Developer')"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-end justify-between">
          <Label>Professional Summary</Label>
          <Button
            variant="outline"
            type="button"
            className="gap-1"
            disabled={loading || !jobTitle.trim()}
            onClick={GenerateSummaryFromAI}
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
          className="mt-2 min-h-36"
          required
          maxLength={SUMMARY_CHAR_LIMIT}
          value={resumeInfo?.summary || ""}
          onChange={handleChange}
          placeholder={
            !jobTitle.trim()
              ? "Enter your job title above to generate AI suggestions"
              : "Enter your professional summary or generate one with AI"
          }
        />
        <p className="text-xs text-muted-foreground text-right mt-1">
          {resumeInfo?.summary?.length || 0}/{SUMMARY_CHAR_LIMIT} characters
        </p>
      </div>

      {aiGeneratedSummary && (
        <div className="space-y-4">
          <h5 className="font-semibold text-[15px]">AI Suggestions</h5>
          {Object.entries(aiGeneratedSummary).map(([experienceType, summary], index) => (
            <Card
              key={index}
              className="bg-primary/5 shadow-none border-primary/30 cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => handleSelect(summary)}
            >
              <CardHeader className="py-2">
                <CardTitle className="font-semibold text-md">
                  {experienceType.charAt(0).toUpperCase() + experienceType.slice(1)} Level
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>{summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummaryForm;