"use client";

import React, { useEffect, useCallback } from "react";
import { Plus, X, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import { generateThumbnail } from "@/lib/helper";
import { toast } from "@/hooks/use-toast";
import { CertificateType } from "@/types/resume.type";

// Default fallback certificates (for preview or when user selects the heading)
const defaultCertificates: CertificateType[] = [
  {
    id: 1,
    name: "Winner, Tejas Presentation Competition",
    issuer: "Infinity",
    year: "May 2025",
  },
  {
    id: 2,
    name: "Introduction to Programming Using JavaScript",
    issuer: "Great Learning",
    year: "Jul 2024",
  },
];

const headingOptions = ["Select", "Certificates", "Achievements", "Extra Curricular Activities"];

const initialCertificate: CertificateType = {
  id: Date.now(),
  name: "",
  issuer: "",
  year: "",
};

interface CertificatesFormProps {
  handleNext?: () => void;
}


const CertificatesForm: React.FC<CertificatesFormProps> = ({ handleNext }) => {
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [certHeading, setCertHeading] = React.useState(
    resumeInfo?.certHeading || headingOptions[0]
  );

  const [certificates, setCertificates] = React.useState<CertificateType[]>(() => {
    const existingCerts = (resumeInfo?.certificates as CertificateType[]) || [];

    if (certHeading === "Select" || existingCerts.length === 0) {
      return defaultCertificates.map((cert, idx) => ({
        ...cert,
        id: cert.id ?? Date.now() + idx,
      }));
    }

    return existingCerts.map((cert, idx) => ({
      ...cert,
      id: cert.id ?? Date.now() + idx,
    }));
  });

  useEffect(() => {
    if (!resumeInfo) return;

    const updatedCertificates =
      certHeading === "Select" ? defaultCertificates : certificates;

    onUpdate({
      ...resumeInfo,
      certificates: updatedCertificates,
      certHeading,
    });
  }, [certificates, certHeading]);

  const handleChange = (
    id: number,
    field: keyof CertificateType,
    value: string
  ) => {
    setCertificates((prev) =>
      prev.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  const handleAdd = () => {
    if (certificates.length >= 5) return;
    setCertificates([
      ...certificates,
      { ...initialCertificate, id: Date.now() },
    ]);
  };

  const handleRemove = (id: number) => {
    setCertificates(certificates.filter((cert) => cert.id !== id));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const thumbnail = await generateThumbnail();

      await mutateAsync(
        {
          currentPosition: 1,
          thumbnail,
          certificates,
          certHeading,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Certificates updated successfully",
            });
            handleNext?.();
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
    [certificates, certHeading, handleNext]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <Label className="text-sm">Section Heading</Label>
          <select
            className="border rounded-md px-2 py-1 w-full"
            value={certHeading}
            onChange={(e) => setCertHeading(e.target.value)}
          >
            {headingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {certHeading !== "Select" && (
          <>
            <div className="w-full">
              <h2 className="font-bold text-lg">{certHeading}</h2>
              <p className="text-sm">
                Add your {certHeading.toLowerCase()} (up to 5)
              </p>
            </div>

            <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
              {certificates.map((cert, index) => (
                <div key={cert.id}>
                  <div className="relative flex flex-col gap-3 pt-4">
                    {certificates.length > 1 && (
                      <Button
                        variant="secondary"
                        type="button"
                        className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white"
                        size="icon"
                        disabled={isPending}
                        onClick={() => handleRemove(cert.id)}
                      >
                        <X size="13px" />
                      </Button>
                    )}

                    <div>
                      <Label className="text-sm">Certificate Name</Label>
                      <Input
                        value={cert.name}
                        onChange={(e) =>
                          handleChange(cert.id, "name", e.target.value)
                        }
                        placeholder="e.g., AWS Certified Developer"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-sm">Issuer</Label>
                      <Input
                        value={cert.issuer}
                        onChange={(e) =>
                          handleChange(cert.id, "issuer", e.target.value)
                        }
                        placeholder="e.g., Amazon Web Services"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-sm">Year</Label>
                      <Input
                        type="text"
                        value={cert.year}
                        onChange={(e) =>
                          handleChange(cert.id, "year", e.target.value)
                        }
                        placeholder="e.g., 2024"
                        required
                      />
                    </div>
                  </div>

                  {index === certificates.length - 1 &&
                    certificates.length < 5 && (
                      <Button
                        className="gap-1 mt-4 text-primary border-primary/50"
                        variant="outline"
                        type="button"
                        disabled={isPending}
                        onClick={handleAdd}
                      >
                        <Plus size="15px" />
                        Add More Certificates
                      </Button>
                    )}
                </div>
              ))}
            </div>
          </>
        )}

        <Button className="mt-4" type="submit" disabled={isPending}>
          {isPending && <Loader size="15px" className="animate-spin" />}
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default CertificatesForm;
