import React, { useCallback, useEffect } from "react";
import { Loader, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import { generateThumbnail } from "@/lib/helper";
import { toast } from "@/hooks/use-toast";

const initialSkillState = {
  name: "",
};

interface SkillsFormProps {
  handleNext: () => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ handleNext }) => {
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [skillsList, setSkillsList] = React.useState(() => {
    const initial = resumeInfo?.skills || [];
    return initial.length > 0 ? initial : [initialSkillState];
  });
  

  // ✅ Live editing: Update context whenever skillsList changes
  useEffect(() => {
    if (!resumeInfo) return;
    onUpdate({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  const handleSkillChange = (value: string, index: number) => {
    setSkillsList((prevState) => {
      const updated = [...prevState];
      updated[index] = { ...updated[index], name: value };
      return updated;
    });
  };

  const addNewSkill = () => {
    setSkillsList([...skillsList, initialSkillState]);
  };

  const removeSkill = (index: number) => {
    const updated = [...skillsList];
    updated.splice(index, 1);
    setSkillsList(updated);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const thumbnail = await generateThumbnail();

      await mutateAsync(
        {
          currentPosition: 1,
          thumbnail: thumbnail,
          skills: skillsList,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Skills updated successfully",
            });
            handleNext();
          },
          onError() {
            toast({
              title: "Error",
              description: "Failed to update",
              variant: "destructive",
            });
          },
        }
      );
    },
    [skillsList, handleNext]
  );

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Skills</h2>
        <p className="text-sm">Add your skills</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
          {skillsList.map((item, index) => (
            <div key={index}>
              <div className="relative flex items-center justify-between mb-5 pt-4 gap-3">
                {skillsList.length > 1 && (
                  <Button
                    variant="secondary"
                    type="button"
                    className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white"
                    size="icon"
                    disabled={isPending}
                    onClick={() => removeSkill(index)}
                  >
                    <X size="13px" />
                  </Button>
                )}

                <div className="flex-1">
                  <Label className="text-sm">Skill Name</Label>
                  <Input
                    name="name"
                    placeholder="e.g., JavaScript, Design"
                    required
                    autoComplete="off"
                    value={item.name || ""}
                    onChange={(e) =>
                      handleSkillChange(e.target.value, index)
                    }
                  />
                </div>
              </div>

              {index === skillsList.length - 1 && skillsList.length < 15 && (
                <Button
                  className="gap-1 mt-1 text-primary border-primary/50"
                  variant="outline"
                  type="button"
                  disabled={isPending}
                  onClick={addNewSkill}
                >
                  <Plus size="15px" />
                  Add More Skills
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button className="mt-4" type="submit" disabled={isPending}>
          {isPending && <Loader size="15px" className="animate-spin" />}
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default SkillsForm;
