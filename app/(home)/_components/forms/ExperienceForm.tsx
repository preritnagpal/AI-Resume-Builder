"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { Button } from "@/components/ui/button";
import { Loader, Plus, X, Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useUpdateDocument from "@/features/document/use-update-document";
import RichTextEditor from "@/components/editor";
import { generateThumbnail } from "@/lib/helper";
import { toast } from "@/hooks/use-toast";
import { MonthYearPicker } from "@/components/ui/MonthYearPicker"; // Fixed import
import { Textarea } from "@/components/ui/textarea";
import { ExperienceType } from "@/types/resume.type";

const initialState: ExperienceType = {
  id: undefined,
  docId: null,
  title: "",
  experienceType: "experience",
  companyName: "",
  startDate: null,
  endDate: null,
  currentlyWorking: false,
  workSummary: "",
  bulletPoints: ["", ""],
};

const ExperienceForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [experienceList, setExperienceList] = useState(() => {
    return resumeInfo?.experiences?.length ? resumeInfo.experiences : [initialState];
  });

  useEffect(() => {
    if (!resumeInfo) return;
    onUpdate({
      ...resumeInfo,
      experiences: experienceList,
    });
  }, [experienceList]);

  const validateExperience = (exp: ExperienceType) => {
    if (!exp.title || !exp.companyName) {
      return 'Position and company are required';
    }
    
    if (exp.startDate && exp.endDate && !exp.currentlyWorking) {
      const start = new Date(exp.startDate);
      const end = new Date(exp.endDate);
      if (end < start) return 'End date cannot be before start date';
    }
    
    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setExperienceList((prev) => {
      const newList = [...prev];
      newList[index] = {
        ...newList[index],
        [name]: value,
      };
      return newList;
    });
  };

  const handleDateChange = (date: Date | null, field: string, index: number) => {
    setExperienceList((prev) => {
      const newList = [...prev];
      newList[index] = {
        ...newList[index],
        [field]: date?.toISOString() || null,
      };

      // Clear end date if it's before the new start date
      if (field === 'startDate' && date && newList[index].endDate) {
        const endDate = new Date(newList[index].endDate);
        if (endDate < date) {
          newList[index].endDate = null;
        }
      }
      return newList;
    });
  };

  const handleEditor = (value: string, name: string, index: number) => {
    if (name === "workSummary" && value.length > 300) return;
    setExperienceList((prev) => {
      const newList = [...prev];
      newList[index] = {
        ...newList[index],
        [name]: value,
      };
      return newList;
    });
  };

  const handleBulletChange = (value: string, index: number, bulletIndex: number) => {
    setExperienceList((prev) => {
      const newList = [...prev];
      const experience = { ...newList[index] };
      const bulletPoints = [...(experience.bulletPoints ?? [])];
      while (bulletPoints.length <= bulletIndex) bulletPoints.push("");
      bulletPoints[bulletIndex] = value;
      experience.bulletPoints = bulletPoints.slice(0, 4);
      newList[index] = experience;
      return newList;
    });
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, initialState]);
  };

  const removeExperience = (index: number) => {
    const updated = [...experienceList];
    updated.splice(index, 1);
    setExperienceList(updated);
  };

  const removeBulletPoint = (expIndex: number, bulletIndex: number) => {
    setExperienceList((prev) => {
      const newList = [...prev];
      const experience = { ...newList[expIndex] };
      const bulletPoints = [...(experience.bulletPoints ?? [])];
      
      if (bulletPoints.length <= 2) return prev;
      
      bulletPoints.splice(bulletIndex, 1);
      experience.bulletPoints = bulletPoints;
      newList[expIndex] = experience;
      return newList;
    });
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validate all experiences
      const errors = experienceList.map(validateExperience).filter(Boolean);
      if (errors.length > 0) {
        toast({
          title: 'Validation Error',
          description: errors.join('\n'),
          variant: 'destructive'
        });
        return;
      }

      const thumbnail = await generateThumbnail();
      const currentNo = resumeInfo?.currentPosition ? resumeInfo.currentPosition + 1 : 1;

      await mutateAsync(
        {
          currentPosition: currentNo,
          thumbnail: thumbnail,
          experience: experienceList,
        },
        {
          onSuccess: () => {
            toast({ title: "Success", description: "Experience updated successfully" });
            handleNext();
          },
          onError() {
            toast({ title: "Error", description: "Failed to update experience", variant: "destructive" });
          },
        }
      );
    },
    [resumeInfo, experienceList]
  );

  const generateBulletsWithGemini = async (index: number, jobTitle: string) => {
    try {
      const prompt = `Generate 4 impactful bullet points for a resume entry titled "${jobTitle}". Each bullet point should:
- Begin with an action verb
- Be concise (max 250 characters)
- Highlight accomplishments, skills, and impact
Return as a JSON array of 4 strings with no extra text.`;

      const res = await fetch("/api/gemini/generate-bullets", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error('Failed to generate bullets');
      
      const { bullets } = await res.json();
      setExperienceList((prev) => {
        const updated = [...prev];
        updated[index].bulletPoints = bullets.slice(0, 4);
        return updated;
      });
    } catch (error) {
      toast({
        title: "Generation Error",
        description: "Failed to generate bullet points",
        variant: "destructive"
      });
    }
  };

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Professional Experience or Internship/Projects</h2>
        <p className="text-sm">Select and fill details accordingly</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="relative grid grid-cols-2 gap-4 mb-5 pt-4">
                {experienceList.length > 1 && (
                  <Button
                    variant="secondary"
                    type="button"
                    className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white"
                    size="icon"
                    onClick={() => removeExperience(index)}
                  >
                    <X size="13px" />
                  </Button>
                )}

                <div className="col-span-2">
                  <Label className="text-sm">Type</Label>
                  <select
                    name="experienceType"
                    className="w-full border rounded-md h-10 px-2"
                    value={item.experienceType}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="experience">Experience</option>
                    <option value="internship_project">Internship / Project</option>
                  </select>
                </div>

                <div>
                  <Label className="text-sm">Position title</Label>
                  <Input
                    name="title"
                    required
                    value={item?.title || ""}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="e.g. Software Engineer"
                  />
                </div>

                <div>
                  <Label className="text-sm">Company/Organization</Label>
                  <Input
                    name="companyName"
                    required
                    value={item?.companyName || ""}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="e.g. Google Inc."
                  />
                </div>
<div>
  <Label className="text-sm">Start Date</Label>
  <MonthYearPicker
    selected={item.startDate ? new Date(item.startDate) : null}
    onChange={(date) => handleDateChange(date, "startDate", index)}
  />
</div>

<div>
  <Label className="text-sm">End Date</Label>
  {item.currentlyWorking ? (
    <div className="h-10 flex items-center font-medium pl-2">Present</div>
  ) : (
    <MonthYearPicker
      selected={item.endDate ? new Date(item.endDate) : null}
      onChange={(date) => handleDateChange(date, "endDate", index)}
    />
  )}
</div>

                <div className="flex items-center space-x-2 col-span-2">
                  <input
                    type="checkbox"
                    id={`currentlyWorking-${index}`}
                    checked={item.currentlyWorking}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setExperienceList((prev) => {
                        const updated = [...prev];
                        updated[index].currentlyWorking = checked;
                        if (checked) {
                          updated[index].endDate = null;
                        }
                        return updated;
                      });
                    }}
                  />
                  <Label htmlFor={`currentlyWorking-${index}`}>I currently work here</Label>
                </div>

                <div className="col-span-2 mt-1">
                  <Label className="text-sm">Work Summary (Max 300 chars)</Label>
                  <RichTextEditor
                    jobTitle={item.title ?? null}
                    initialValue={item.workSummary || ""}
                    onEditorChange={(value: string) => handleEditor(value, "workSummary", index)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.workSummary?.length || 0}/300 characters
                  </p>
                </div>

                {item.bulletPoints?.map((point, i) => (
                  <div className="col-span-2 relative" key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <Label className="text-sm">Bullet Point {i + 1}</Label>
                      {item.bulletPoints && item.bulletPoints.length > 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          className="size-6 p-0 text-destructive"
                          onClick={() => removeBulletPoint(index, i)}
                        >
                          <X size="14px" />
                        </Button>
                      )}
                    </div>
                    <Textarea
                      value={point}
                      onChange={(e) => handleBulletChange(e.target.value, index, i)}
                      maxLength={250}
                      className="min-h-[80px] break-words"
                      placeholder="Describe your accomplishment or responsibility"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {point.length}/250 characters
                    </p>
                  </div>
                ))}

                {item.bulletPoints && item.bulletPoints.length < 4 && (
                  <div className="col-span-2 mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleBulletChange("", index, item.bulletPoints!.length)}
                    >
                      <Plus size={14} className="mr-1" /> Add Bullet Point
                    </Button>
                  </div>
                )}

                <div className="col-span-2 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => generateBulletsWithGemini(index, item.title ?? "")}
                    disabled={!item.title}
                  >
                    <Sparkles size={14} className="mr-1" /> Auto-Fill Bullets
                  </Button>
                </div>
              </div>

              {index === experienceList.length - 1 && experienceList.length < 5 && (
                <Button
                  className="gap-1 mt-1 text-primary border-primary/50"
                  variant="outline"
                  type="button"
                  onClick={addNewExperience}
                >
                  <Plus size="15px" />
                  Add More Experience
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button className="mt-4 w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader size="15px" className="animate-spin mr-2" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ExperienceForm;