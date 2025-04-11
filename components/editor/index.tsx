import React, { useState } from "react";
import {
  EditorProvider,
  Editor,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  Separator,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
} from "react-simple-wysiwyg";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AIChatSession } from "@/lib/google-ai-model";

const PROMPT = `Given the job title "{jobTitle}", generate 6-7 bullet points highlighting key contributions, skills, and achievements. 
Return ONLY a valid HTML unordered list like: <ul><li>...</li></ul>. Do not include job title or any other text.`;

const RichTextEditor = (props: {
  jobTitle: string | null;
  initialValue: string;
  onEditorChange: (e: any) => void;
}) => {
  const { jobTitle, initialValue, onEditorChange } = props;

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialValue || "");

  const GenerateSummaryFromAI = async () => {
    try {
      if (!jobTitle) {
        toast({
          title: "Must provide Job Position",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);
      const prompt = PROMPT.replace("{jobTitle}", jobTitle);
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = await result.response.text();

      let htmlOutput = "";

      try {
        const parsed = JSON.parse(responseText);
        if (Array.isArray(parsed.keyContributions)) {
          htmlOutput = `<ul>${parsed.keyContributions
            .map((item: string) => `<li>${item}</li>`)
            .join("")}</ul>`;
        } else {
          throw new Error("JSON does not contain keyContributions array.");
        }
      } catch (jsonError) {
        // If not JSON, use raw HTML directly
        htmlOutput = responseText;
      }

      setValue(htmlOutput);
      onEditorChange(htmlOutput);
    } catch (error) {
      console.log("AI Error:", error);
      toast({
        title: "Failed to generate summary",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <Label>Work Summary</Label>
        <Button
          variant="outline"
          type="button"
          className="gap-1"
          disabled={loading}
          onClick={GenerateSummaryFromAI}
        >
          <>
            <Sparkles size="15px" className="text-purple-500" />
            Generate with AI
          </>
          {loading && <Loader size="13px" className="animate-spin ml-1" />}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          containerProps={{
            style: {
              resize: "vertical",
              lineHeight: 1.2,
              fontSize: "13.5px",
            },
          }}
          onChange={(e) => {
            setValue(e.target.value);
            onEditorChange(e.target.value);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
