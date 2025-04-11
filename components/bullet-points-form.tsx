'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "@/context/resume-info-provider";
import { AIChatSession } from "@/lib/google-ai-model";
import { ResumeDataType } from "@/types/resume.type";
import { Loader, Sparkles, RefreshCw } from "lucide-react";
import React, { useCallback, useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ExtendedResumeDataType extends ResumeDataType {
  bulletPoints?: string;
}

const BULLET_POINT_LIMIT = 7;

const getBulletPrompt = (jobTitle: string) => `Job Title: ${jobTitle}. 
Generate ${BULLET_POINT_LIMIT} professional bullet points that would work for all experience levels.
Each bullet must:
1. Start with a strong action verb
2. Include quantifiable achievements
3. Be 1-2 sentences maximum
4. Use industry-specific keywords
5. Show impact and results

Return as a JSON array under the key "bullets". Example:
{"bullets": ["Increased efficiency by 30% by...", "Led team of 5 developers to..."]}`;

const BulletPointForm = () => {
  const { resumeInfo, onUpdate } = useResumeContext();
  const [loading, setLoading] = useState(false);
  const [generatedBullets, setGeneratedBullets] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const resumeDataInfo = resumeInfo as ExtendedResumeDataType;
    const updatedInfo = {
      ...resumeDataInfo,
      bulletPoints: e.target.value,
    };
    onUpdate(updatedInfo);
  };

  const generateBulletPoints = async () => {
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
      const PROMPT = getBulletPrompt(jobTitle);
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      
      const response = JSON.parse(responseText);
      setGeneratedBullets(response.bullets || []);

      if (response.bullets?.length) {
        toast({
          title: "Success",
          description: `Generated ${response.bullets.length} bullet points`,
        });
      } else {
        throw new Error("No bullets generated");
      }

    } catch (error) {
      toast({
        title: "Failed to generate bullet points",
        description: "Please try again later",
        variant: "destructive",
      });
      setGeneratedBullets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = useCallback(() => {
    if (!resumeInfo || !generatedBullets.length) return;
    const resumeDataInfo = resumeInfo as ExtendedResumeDataType;
    const updatedInfo = {
      ...resumeDataInfo,
      bulletPoints: generatedBullets.join('\n'),
    };
    onUpdate(updatedInfo);
  }, [generatedBullets, onUpdate, resumeInfo]);

  const clearGenerated = () => {
    setGeneratedBullets([]);
  };

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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Professional Bullet Points</Label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={generateBulletPoints}
              disabled={loading || !jobTitle.trim()}
            >
              {loading ? (
                <Loader size={15} className="animate-spin mr-1" />
              ) : (
                <Sparkles size={15} className="text-primary mr-1" />
              )}
              Generate with AI
            </Button>
            {generatedBullets.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearGenerated}
              >
                <RefreshCw size={15} className="mr-1" />
                Regenerate
              </Button>
            )}
          </div>
        </div>

        <Textarea
          className="min-h-36"
          value={(resumeInfo as ExtendedResumeDataType)?.bulletPoints || ""}
          onChange={handleChange}
          placeholder={
            !jobTitle.trim()
              ? "Enter your job title above to generate AI suggestions"
              : "Your bullet points will appear here"
          }
        />
      </div>

      {generatedBullets.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="font-semibold text-[15px]">AI Suggestions</h5>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSelect}
            >
              Use These Bullets
            </Button>
          </div>
          
          <Card className="bg-primary/5 border-primary/30">
            <CardContent className="p-4 space-y-2">
              {generatedBullets.map((bullet: string, i: number) => (
                <div key={i} className="flex">
                  <span className="text-muted-foreground mr-2">•</span>
                  <p className="text-sm">{bullet}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BulletPointForm;