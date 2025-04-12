"use client";
import React, { useCallback, useEffect } from "react";
import { Loader, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import { generateThumbnail } from "@/lib/helper";
import { toast } from "@/hooks/use-toast";
import { HobbyType } from "@/types/resume.type";

const initialHobbyState = (docId: number): HobbyType => ({
  name: "",
  docId,
});

interface HobbiesFormProps {
  handleNext: () => void;
}

const HobbiesForm: React.FC<HobbiesFormProps> = ({ handleNext }) => {
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const docId = resumeInfo?.id ?? 0;

  const [hobbiesList, setHobbiesList] = React.useState<HobbyType[]>(() => {
    const normalized = (resumeInfo?.hobbies || []).map((hobby) => {
      if (typeof hobby === "string") {
        return { name: hobby, docId };
      }
      return {
        name: hobby.name,
        docId: hobby.docId ?? docId,
        id: hobby.id,
      };
    });

    return normalized.length > 0 ? normalized : [initialHobbyState(docId)];
  });

  // Update live preview
  useEffect(() => {
    if (!resumeInfo) return;

    const cleanedHobbies: HobbyType[] = hobbiesList
      .map((h) => ({
        ...h,
        name: h.name.trim(),
        docId,
      }))
      .filter((h) => h.name.length > 0);

    onUpdate({
      ...resumeInfo,
      title: resumeInfo.title ?? "", // ensure title exists
      hobbies: cleanedHobbies,
    });
  }, [hobbiesList]);

  const handleHobbyChange = (value: string, index: number) => {
    setHobbiesList((prevState) => {
      const updated = [...prevState];
      updated[index] = { ...updated[index], name: value };
      return updated;
    });
  };

  const addNewHobby = () => {
    setHobbiesList([...hobbiesList, initialHobbyState(docId)]);
  };

  const removeHobby = (index: number) => {
    const updated = [...hobbiesList];
    updated.splice(index, 1);
    setHobbiesList(updated);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const thumbnail = await generateThumbnail();

      const cleanedHobbies: HobbyType[] = hobbiesList
        .map((h) => ({
          ...h,
          name: h.name.trim(),
          docId,
        }))
        .filter((h) => h.name.length > 0);

      await mutateAsync(
        {
          currentPosition: 2,
          thumbnail,
          hobbies: cleanedHobbies,
          title: resumeInfo?.title ?? "", // required by ResumeDataType
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Hobbies updated successfully",
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
    [hobbiesList, handleNext, mutateAsync]
  );

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Hobbies</h2>
        <p className="text-sm">Add your hobbies</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
          {hobbiesList.map((item, index) => (
            <div key={index}>
              <div className="relative flex items-center justify-between mb-5 pt-4 gap-3">
                {hobbiesList.length > 1 && (
                  <Button
                    variant="secondary"
                    type="button"
                    className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white"
                    size="icon"
                    disabled={isPending}
                    onClick={() => removeHobby(index)}
                  >
                    <X size="13px" />
                  </Button>
                )}

                <div className="flex-1">
                  <Label className="text-sm">Hobby Name</Label>
                  <Input
                    name="name"
                    placeholder="e.g., Painting, Cycling"
                    required
                    autoComplete="off"
                    value={item.name}
                    onChange={(e) =>
                      handleHobbyChange(e.target.value, index)
                    }
                  />
                </div>
              </div>

              {index === hobbiesList.length - 1 && hobbiesList.length < 15 && (
                <Button
                  className="gap-1 mt-1 text-primary border-primary/50"
                  variant="outline"
                  type="button"
                  disabled={isPending}
                  onClick={addNewHobby}
                >
                  <Plus size="15px" />
                  Add More Hobbies
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button className="mt-4" type="submit" disabled={isPending}>
          {isPending && <Loader size="15px" className="animate-spin" />}
          Save & Done
        </Button>
      </form>
    </div>
  );
};

export default HobbiesForm;
