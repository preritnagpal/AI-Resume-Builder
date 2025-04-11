// Experience Section
export type ExperienceType = {
  id?: number;
  docId?: number | null;

  // Shared fields
  experienceType?: "experience" | "internship_project";
  title?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  currentlyWorking: boolean;
  workSummary?: string | null;

  // Fields specific to "experience"
  companyName?: string | null;
  city?: string | null;
  state?: string | null;

  // Fields specific to "internship_project"
  organizationName?: string | null;
  bulletPoints?: string[]; // up to 4 bullet points
};



// Education Section
export type EducationType = {
  id?: number;
  docId?: number | null;
  universityName?: string | null;
  session?: string | null;
  degree?: string | null;
  startDate?: string | null | undefined;
  endDate?: string | null | undefined;
  currentlyStudying?: boolean;
  customDegree?: string | null | undefined;  // Allow null here as well
};



// Skills Section
export type SkillType = {
  id?: number;
  docId?: number | null;
  name?: string | null;
};
export type HobbyType = {
  id?: number;
  docId: number; // <-- make sure it's not optional or nullable
  name: string;
};


// Personal Info
export type PersonalInfoType = {
  id?: number;
  docId?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  jobTitle?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  linkedin?: string | null;
  otherLinks?: string[];  // This must always be an array
  image?: string | null; // This corresponds to the profile image
};



// Certificates
export type CertificateType = {
  id: number;
  docId?: number;
  name: string;
  issuer: string;
  year: string;
  certHeading?: string;
};



// Resume Status
export type StatusType = "archived" | "private" | "public";

// Master Resume Type
export type ResumeDataType = {
  id?: number;
  documentId?: string;
  title: string;
  status: StatusType;
  thumbnail?: string | null;
  personalInfo?: PersonalInfoType | null;
  themeColor?: string | null;
  currentPosition?: number | null;
  summary?: string | null;
  experiences?: ExperienceType[] | null;
  educations?: EducationType[] | null;
  skills?: SkillType[] | null;
  certificates?: CertificateType[] | null;
  hobbies?: HobbyType[] | null;
  certHeading?: string;
  selectedTemplate?: string;
  
  updatedAt?: string;

  /** ✅ Add this */
  otherLinks?: {
    label: string;
    url: string;
  }[];
};

