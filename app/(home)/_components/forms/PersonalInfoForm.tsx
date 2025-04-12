import React, { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useResumeContext } from "@/context/resume-info-provider";
import { toast } from "@/hooks/use-toast";
import { generateThumbnail } from "@/lib/helper";
import useUpdateDocument from "@/features/document/use-update-document";

// ✅ Added prop type
type PersonalInfoFormProps = {
  handleNext: () => void;
};

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ handleNext }) => {
  const { resumeInfo, onUpdate } = useResumeContext();

  const [personalInfo, setPersonalInfo] = useState(() => {
    return resumeInfo?.personalInfo || {
      firstName: "",
      lastName: "",
      jobTitle: "",
      address: "",
      phone: "",
      email: "",
      linkedin: "",
      otherLinks: [],
      image: "",
    };
  });

  const { mutateAsync, isPending } = useUpdateDocument();

  useEffect(() => {
    if (!resumeInfo) return;
    onUpdate({
      ...resumeInfo,
      personalInfo,
    });
  }, [personalInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const thumbnail = await generateThumbnail();
      const currentNo = resumeInfo?.currentPosition
        ? resumeInfo.currentPosition + 1
        : 1;

      await mutateAsync(
        {
          currentPosition: currentNo,
          thumbnail,
          personalInfo,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Personal information saved successfully",
            });
            handleNext(); // ✅ Call next step
          },
          onError: () => {
            toast({
              title: "Error",
              description: "Failed to save personal information",
              variant: "destructive",
            });
          },
        }
      );
    },
    [personalInfo, resumeInfo, handleNext]
  );

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-bold h-full overflow-y-auto pr-2 text-lg">Personal Information</h2>
      <div className="grid gap-4 mt-4">
        <div>
          <Label>First Name</Label>
          <Input
            name="firstName"
            value={personalInfo.firstName || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input
            name="lastName"
            value={personalInfo.lastName || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Job Title</Label>
          <Input
            name="jobTitle"
            value={personalInfo.jobTitle || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            value={personalInfo.email || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Phone</Label>
          <Input
            name="phone"
            value={personalInfo.phone || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Address</Label>
          <Input
            name="address"
            value={personalInfo.address || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>LinkedIn</Label>
          <Input
            name="linkedin"
            value={personalInfo.linkedin || ""}
            onChange={handleChange}
          />
        </div>

        <div className="cursor-pointer">
          <Label htmlFor="image" className="cursor-pointer">Upload Profile Photo</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64String = reader.result as string;
                  setPersonalInfo((prev) => ({
                    ...prev,
                    image: base64String,
                  }));
                };
                reader.readAsDataURL(file);
              }
            }}
            className="cursor-pointer"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Upload a formal profile photo. JPG/PNG preferred.
          </p>
        </div>
      </div>

      <Button className="mt-4" type="submit" disabled={isPending}>
        {isPending && <Loader size="15px" className="animate-spin mr-1" />}
        Save Changes
      </Button>
    </form>
  );
};

export default PersonalInfoForm;
