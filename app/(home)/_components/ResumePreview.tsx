"use client";
import { useEffect } from "react";
import { FaHome, FaPhone, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useResumeContext } from "@/context/resume-info-provider";
import { ResumeDataType, EducationType, ExperienceType, PersonalInfoType, HobbyType, SkillType, CertificateType } from "@/types/resume.type";
// In any component file (e.g., ResumePreview.tsx)
import { formatResumeDate } from '@/lib/utils'; 
const ResumePreview = () => {
  const { resumeInfo,onUpdate } = useResumeContext();

  // If no resume data is available, return null or a loading state
  if (!resumeInfo) {
    return null;
  }

  // Create safe versions of all array properties
  const safeCertificates = resumeInfo.certificates ?? [];

  // Destructure with default values
  const {
    personalInfo = {} as PersonalInfoType,
    summary = "",
  } = resumeInfo;

  // Helper function to combine first and last name
  const fullName = `${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}`.trim() || "PRERIT NAGPAL";

  // Place this at the top of your file
const defaultExperiences: ExperienceType[] = [
  {
    experienceType: "internship_project",
    title: "Web Developer Intern",
    startDate: "2023-07-01",
    endDate: "2023-08-01",
    currentlyWorking: false,
    companyName: "Reliance BP Mobility Limited",
    workSummary:
      "During my internship, I worked on an innovative web-based tool designed to identify aircraft types using decal images. The tool uses image processing to analyze these decals and match them to over 50 aircraft models. It was a fun and practical project that helped make aircraft identification faster and easier for users. I got to work on both the design and functionality, learning a lot about web development along the way.",
    bulletPoints: [
      "Developed and maintained a dynamic web application using HTML, CSS, JavaScript,and C#, resulting in a 30% increase in user engagement. ",
      "Engineered a user-friendly web tool, successfully identifying over 50 aircraft types based on Decal images. ",
      "Optimized application performance, reducing load times by 30%, enhancing user experience and efficiency.",
      "Collaborated in code reviews and team meetings to ensure quality and consistency across the development lifecycle. ",
    ],
  },
  {
    experienceType: "internship_project",
    title: "Freelance Web Developer | Bloomance",
    startDate: "2025-01-01",
    endDate: "",
    currentlyWorking: true,
    organizationName: "Freelance",
    workSummary:
      "Led the development of a custom website for Bloomance, a client-focused e-commerce platform, enhancing user experience and visual appeal through modern design principles and responsive web development. ",
    bulletPoints: [
      "Developed and launched a custom e-commerce platform for Bloomance, focusing on improving user experience and conversion rates. ",
      "Integrated NBR (New Business Rules) into the website to automate inventory management and streamline order processing for better operational efficiency. ",
      "Utilized Shopify, HTML, CSS, and JavaScript to create a responsive and mobile- friendly website. ",
      "Collaborated with the client to ensure the website met branding goals and was optimized for SEO and security.",
    ],
  },
];
const defaultCertificates = [
  {
    name: "Winner, Tejas Presentation Competition",
    issuer: "Infinity",
    year: "May 2025",
  },
  {
    name: "Introduction to Programming Using JavaScript",
    issuer: "Great Learning",
    year: "Jul 2024",
  },
];
const defaultEducations: EducationType[] = [
  {
    universityName: "Invertis University",
    degree: "Masters of computer applications",
    session: "2024 – 2026",
  },
  {
    universityName: "Invertis University",
    degree: "Bachelor of computer applications",
    session: "2021 – 2024",
  },
  {
    universityName: "Bishop Conrad Senior Secondary School",
    degree: "10+2",
    session: "2019 – 2020",
  },
  {
    universityName: "Bishop Conrad Senior Secondary School",
    degree: "10",
    session: "2017 – 2018",
  },
];
const defaultSkills: SkillType[] = [
  { name: "React.js" },
  { name: "Next.js" },
  { name: "JavaScript" },
  { name: "TypeScript" },
  { name: "HTML5" },
  { name: "CSS3" },
  { name: "Tailwind CSS" },
  { name: "Git & GitHub" },
  { name: "Responsive Web Design" },
];
const defaultHobbies: HobbyType[] = [
  { docId: 1, name: "Reading Tech Blogs" },
  { docId: 2, name: "Playing Chess" },
  { docId: 3, name: "Watching Documentaries" },
];



const degreePriority = ["Masters", "Bachelors", "10+2", "10", "other"];

const educationToDisplay = Array.isArray(resumeInfo.educations) && resumeInfo.educations.length > 0
  ? resumeInfo.educations
  : defaultEducations;



const safeEducations = [...educationToDisplay].sort(
  (a, b) =>
    degreePriority.indexOf(a.degree || "") - degreePriority.indexOf(b.degree || "")
);



// Use this inside your component
const safeExperiences: ExperienceType[] = Array.isArray(resumeInfo?.experiences) && resumeInfo.experiences.length > 0
  ? resumeInfo.experiences
  : defaultExperiences;

  // lib/dummy.ts



  const displayedCertificates =
  safeCertificates.length > 0
    ? safeCertificates
    : defaultCertificates;

    const safeSkills = Array.isArray(resumeInfo.skills) && resumeInfo.skills.length > 0
    ? resumeInfo.skills
    : defaultSkills;
    const safeHobbies: HobbyType[] =
    Array.isArray(resumeInfo.hobbies) && resumeInfo.hobbies.length > 0
      ? resumeInfo.hobbies
      : defaultHobbies;
  
  useEffect(() => {
    if (!resumeInfo?.hobbies?.length) {
      onUpdate({
        ...resumeInfo,
        hobbies: defaultHobbies,
      });
    }
  }, []);
  


// Optional: update resumeInfo context if it's initially empty
useEffect(() => {
  if (!resumeInfo?.experiences?.length) {
    onUpdate({
      ...resumeInfo,
      experiences: defaultExperiences,
    });
  }
}, []);
useEffect(() => {
  console.log("Live resumeInfo.educations:", resumeInfo.educations);
}, [resumeInfo.educations]);
useEffect(() => {
  if (!resumeInfo?.skills?.length) {
    onUpdate({
      ...resumeInfo,
      skills: defaultSkills,
    });
  }
}, []);


  return (
    <div
      id="resume-preview-id"
      className={cn(`
        shadow-lg bg-white w-full max-w-4xl mx-auto
        min-h-[1123px] font-open-sans border border-gray-300
        print:shadow-none print:bg-white print:text-black
        print:w-full print:max-w-full print:min-h-0
        print:border-none print:p-0 print:m-0
      `)}
    >
      {/* Top Header Section */}
      <div className="relative bg-[#5377A2] h-[160px]">
        {/* Profile Image on the left */}
        {personalInfo?.image && (
        <div>
          <img
            src={personalInfo.image}
            alt="Preview"
            className="w-34 h-40 object-cover"
          />
        </div>
        )}

        {/* Name and title centered absolutely */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold tracking-widest">
            {fullName.toUpperCase()}
          </h1>
          <p className="text-lg font-semibold">
            {personalInfo?.jobTitle || "FRONTEND DEVELOPER"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 pt-8">
        {/* Left Column */}
        <aside className="md:col-span-1 space-y-8">
          {/* Contact */}
          <section className="text-[13px]  space-y-[16px] ">
            <div className="flex items-center space-x-2 break-words">
            <FaHome size={24} />
              <span>{personalInfo?.address || "C-212 GN City, Karamchari Nagar, Bareilly."}</span>
            </div>
            <div className="flex items-start space-x-2">
            <FaPhone size={20} className=" text-green-500"/>
              <span>{personalInfo?.phone || "+91 9690058658"}</span>
            </div>
            <div className="flex items-start space-x-2">
            <FaEnvelope size={20} className=" text-red-500" />
              <span>{personalInfo?.email || "preritnagpal1234@gmail.com"}</span>
            </div>
            <div className="flex items-start space-x-2">
            <FaLinkedin size={20} className=" text-blue-500" />
              <span>{personalInfo?.linkedin || "linkedin.com/in/preritnagpal"}</span>
            </div>
            {personalInfo?.otherLinks?.map((link, index: number) => (
              <div key={index} className="flex items-start space-x-2">
                <Image src="/icons/linkedin.png" alt="" width={20} height={20} />
                <span>{link}</span>
              </div>
            ))}
          </section>

          {/* Education */}
          
          <section>
  <div className="border-t-2 border-black">
    <h2 className="text-base font-bold mt-1">EDUCATION</h2>
  </div>
  <ul className="space-y-4 mt-1">
    {safeEducations.map((edu: EducationType, index: number) => {
      const displayDegree = edu.degree === "Other" && edu.customDegree 
        ? edu.customDegree 
        : edu.degree || "";

      const displayUniversity = edu.universityName?.trim() || 
        (defaultEducations[index]?.universityName || "");

      const displaySession = edu.startDate
        ? `${formatResumeDate(edu.startDate)} – ${
            edu.currentlyStudying
              ? "Present"
              : edu.endDate
              ? formatResumeDate(edu.endDate)
              : "End"
          }`
        : edu.session?.trim() || defaultEducations[index]?.session || "";
      
      return (
        <li key={index} className="break-words">
          <p className="font-semibold text-[14px] break-words">{displayDegree.toUpperCase().replace("OF ", "OF\n")}</p>
          <span className="text-[13px] block break-words">{displayUniversity}</span>
          <span className="text-[13px] block break-words">{displaySession}</span>
        </li>
      );
    })}
  </ul>
</section>

          {/* Skills */}
          <section>
            <div className="border-t-2 border-black mt-[-20px]">
              <h2 className="text-base font-bold mt-1">CORE COMPETENCIES</h2>
              <p className="text-[14px] font-semibold">(Technical & Soft skills) </p>
            </div>
            <ul className="text-[13px] list-none  space-y-2 text-justify mt-1">
              {safeSkills.filter(skill => skill.name?.trim()).map((skill, index) => (
              <li key={index}>{skill.name}</li>
              ))}
            </ul>

          </section>

          {/* Hobbies */}
          {/* Hobbies */}
          <section>
  <div className="border-t-2 border-black mt-[-9px]">
    <h2 className="text-base font-bold mt-1">HOBBIES</h2>
  </div>
  {safeHobbies.some(hobby => hobby.name.trim() !== "") && (
    <ul className="text-[13px] list-none  space-y-1 text-justify mt-1">
      {safeHobbies
        .filter(hobby => hobby.name.trim() !== "")
        .map((hobby: HobbyType, index: number) => (
          <li key={index}>{hobby.name}</li>
        ))}
    </ul>
  )}
</section>


        </aside>

        {/* Right Column */}
        <main className="md:col-span-2 space-y-6">
          {/* Profile Summary */}
          <section>
            <div className="mb-1">
              <h2 className="text-base font-bold mt-0">PROFILE SUMMARY</h2>
            </div>
            <p className="text-[13px] mt-[7px] text-black text-justify whitespace-pre-wrap break-words">
              {summary || "Frontend Developer with hands-on experience as a web developer intern and a strong foundation in HTML, CSS, JavaScript, and frameworks like React and Bootstrap. Enthusiastic about building dynamic, user-friendly web applications. Currently pursuing MCA to enhance knowledge and develop advanced technical skills. I thrive in collaborative environments and am committed to delivering high-quality, efficient solutions. Eager to continue learning, adapt to new technology, and contribute to the success."}
            </p>
          </section>

          {/* Experience/Projects */}
          <section>
  <div className="border-t-2 border-black mt-[-14px]">
    <h2 className="text-base font-bold mt-1">
      {safeExperiences.every((exp) => exp.experienceType === "internship_project")
        ? "INTERNSHIP/PROJECTS"
        : "EXPERIENCE"}
    </h2>
  </div>

  {safeExperiences.map((exp: ExperienceType, index: number) => (
    <div key={exp.id ?? index} className={index > 0 ? "mt-5" : "mt-2"}>
      <div className="flex justify-between items-baseline">
        <h3 className="font-bold text-[14px]">
          {(exp.title ?? "Untitled").toUpperCase()}
        </h3>
        <span className="float-right font-bold text-[13px]">
          {exp.startDate ? formatResumeDate(exp.startDate) : "Start"}–
          {exp.currentlyWorking
            ? "Present"
            : exp.endDate
            ? formatResumeDate(exp.endDate)
            : "End"}
        </span>
      </div>

      <p className="italic text-[13px] font-semibold mt-0  text-black">
        {exp.companyName || exp.organizationName || "Unknown Organization"}
      </p>

      {exp.workSummary && (
  <p className="text-[13px] mt-0 text-justify break-words">
    {exp.workSummary.length > 500
      ? exp.workSummary.substring(0, 500) + "..."
      : exp.workSummary}
  </p>
)}


{(exp.bulletPoints?.length ?? 0) > 0 && (
  <ul className="list-disc ml-6 mt-1 text-sm space-y-2">
    {exp.bulletPoints?.map((point, idx) => (
      <li key={idx} className="flex items-start gap-1 text-justify text-[13px]">
        <span className="mt-[3px] text-lg leading-none">•</span>
        <span className="break-words"></span>
        {point.length > 250 ? point.substring(0, 250) + "..." : point}
      </li>
    ))}
  </ul>
)}
    </div>
  ))}
</section>



          {/* Certifications */}
          {displayedCertificates.length > 0 && resumeInfo.certHeading !== "Select" && (
  <section>
    <div className="border-t-2 border-black mt-4">
      <h2 className="text-base font-bold mt-1">
        {resumeInfo.certHeading || "CERTIFICATIONS"}
      </h2>
    </div>
    <ul className="list-disc pl-5 text-[13px] space-y-1 text-justify mt-1">
      {displayedCertificates.map((cert, index) => (
        <li key={index}>
          <strong>{cert.name}</strong> | {cert.issuer} | {cert.year}
        </li>
      ))}
    </ul>
  </section>
)}

        </main>
      </div>
    </div>
  );
};

export default ResumePreview;