"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useResumeContext } from "@/context/resume-info-provider";
import { Button } from "@/components/ui/button";
import { Loader, Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";
import { MonthYearPicker } from "@/components/ui/MonthYearPicker";
import { EducationType } from "@/types/resume.type";

const degreeOptions = [
  "Masters of Computer Applications",
  "Masters of Business Administration",
  "Masters of Science",
  "Masters of Arts",
  "Masters of Technology",
  "Masters of Engineering",
  "Masters of Design",
  "Mtech",
  "Msc",
  "Btech",
  "Btech (Hons)",
  "Btech CSE",
  "Bachelors of Computer Applications",
  "Bachelors of Business Administration",
  "Bachelors of Science",
  "Bachelors of Arts",
  "10+2",
  "10",
  "Other"];

const initialState: EducationType = {
  id: undefined,
  docId: null,
  universityName: "",
  degree: "",
  customDegree: "",
  startDate: null,
  endDate: null,
  currentlyStudying: false,
  session: "",
};

const EducationForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [educationList, setEducationList] = useState(() => {
    return resumeInfo?.educations?.length ? resumeInfo.educations : [initialState];
  });

  useEffect(() => {
    if (!resumeInfo) return;
    onUpdate({
      ...resumeInfo,
      educations: educationList, // Change from 'educations' to 'education'
    });
  }, [educationList]);

  const validateEducation = (edu: EducationType) => {
    if (!edu.universityName) {
      return 'University name is required';
    }
    
    if (!edu.degree) {
      return 'Degree level is required';
    }
    
    if (edu.degree === "Other" && !edu.customDegree) {
      return 'Custom degree name is required when selecting "Other"';
    }
    
    if (edu.startDate && edu.endDate && !edu.currentlyStudying) {
      const start = new Date(edu.startDate);
      const end = new Date(edu.endDate);
      if (end < start) return 'End date cannot be before start date';
    }
    
    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setEducationList((prev) => {
      const newList = [...prev];
      newList[index] = {
        ...newList[index],
        [name]: value,
      };
      return newList;
    });
  };

  const handleDateChange = (date: Date | null, field: string, index: number) => {
    setEducationList((prev) => {
      const newList = [...prev];
      newList[index] = {
        ...newList[index],
        [field]: date?.toISOString() || null,
      };

      if (field === 'startDate' && date && newList[index].endDate) {
        const endDate = new Date(newList[index].endDate);
        if (endDate < date) {
          newList[index].endDate = null;
        }
      }
      return newList;
    });
  };

  const addNewEducation = () => {
    if (educationList.length >= 5) {
      toast({
        title: "Maximum limit reached",
        description: "You can add up to 5 education entries",
        variant: "destructive",
      });
      return;
    }
    setEducationList([...educationList, initialState]);
  };

  const removeEducation = (index: number) => {
    const updated = [...educationList];
    updated.splice(index, 1);
    setEducationList(updated);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      
      const errors = educationList.map(validateEducation).filter(Boolean);
      if (errors.length > 0) {
        toast({
          title: 'Validation Error',
          description: errors.join('\n'),
          variant: 'destructive'
        });
        return;
      }

      const currentNo = resumeInfo?.currentPosition ? resumeInfo.currentPosition + 1 : 1;

      await mutateAsync(
        {
          currentPosition: currentNo,
          education: educationList,
        },
        {
          onSuccess: () => {
            toast({ title: "Success", description: "Education updated successfully" });
            handleNext();
          },
          onError() {
            toast({ title: "Error", description: "Failed to update education", variant: "destructive" });
          },
        }
      );
    },
    [resumeInfo, educationList]
  );

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Education Details</h2>
        <p className="text-sm">Add your educational qualifications</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
          {educationList.map((item, index) => (
            <div key={index} className="pt-4">
              <div className="relative grid grid-cols-2 gap-4 mb-5">
                {educationList.length > 1 && (
                  <Button
                    variant="secondary"
                    type="button"
                    className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white"
                    size="icon"
                    onClick={() => removeEducation(index)}
                  >
                    <X size="13px" />
                  </Button>
                )}

                <div className="col-span-2">
                  <Label className="text-sm">University/Institution</Label>
                  <Input
                    name="universityName"
                    required
                    value={item.universityName || ""}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="e.g. Harvard University"
                  />
                </div>

                <div>
                  <Label className="text-sm">Degree Level</Label>
                  <select
                    name="degree"
                    className="w-full border rounded-md h-10 px-2"
                    value={item.degree || ""}
                    onChange={(e) => handleChange(e, index)}
                    required
                  >
                    <option value="">Select degree</option>
                    {degreeOptions.map((degree) => (
                      <option key={degree} value={degree}>
                        {degree}
                      </option>
                    ))}
                  </select>
                </div>

                {item.degree === "Other" && (
                  <div>
                    <Label className="text-sm">Custom Degree Name</Label>
                    <Input
                      name="customDegree"
                      required
                      value={item.customDegree || ""}
                      onChange={(e) => handleChange(e, index)}
                      placeholder="e.g. Associate's Degree"
                    />
                  </div>
                )}

                <div>
                  <Label className="text-sm">Start Date</Label>
                  <MonthYearPicker
                    selected={item.startDate ? new Date(item.startDate) : null}
                    onChange={(date) => handleDateChange(date, "startDate", index)}
                  />
                </div>

                <div>
                  <Label className="text-sm">End Date</Label>
                  {item.currentlyStudying ? (
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
                    id={`currentlyStudying-${index}`}
                    checked={item.currentlyStudying}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setEducationList((prev) => {
                        const updated = [...prev];
                        updated[index] = {
                          ...updated[index],
                          currentlyStudying: checked,
                          endDate: checked ? null : updated[index].endDate,
                        };
                        return updated;
                      });
                    }}
                  />
                  <Label htmlFor={`currentlyStudying-${index}`}>I currently study here</Label>
                </div>

                <div className="col-span-2">
                  <Label className="text-sm">Session (Optional)</Label>
                  <Input
                    name="session"
                    value={item.session || ""}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="e.g. 2018-2022"
                  />
                </div>
              </div>

              {index === educationList.length - 1 && educationList.length < 5 && (
                <Button
                  className="gap-1 mt-1 text-primary border-primary/50"
                  variant="outline"
                  type="button"
                  onClick={addNewEducation}
                >
                  <Plus size="15px" />
                  Add More Education
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

export default EducationForm;