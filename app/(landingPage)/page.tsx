'use client';

import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ChevronRight, Video,ArrowUpRight,FileText, Sparkles, Download,Search, Wand2, Linkedin, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { isAuthenticated } = useKindeBrowserClient();
  const [atsIndex, setAtsIndex] = useState<number | null>(0);
const [builderIndex, setBuilderIndex] = useState<number | null>(null);

const atsFeatures = [
  {
    title: "Comprehensive Error Detection",
    description:
      "Identify all the grammatical, spelling, and punctuation-related errors instantly",
  },
  {
    title: "ATS Compatibility Check",
    description: "Ensure your resume is compatible with Applicant Tracking Systems.",
  },
  {
    title: "Content Optimisation",
    description: "Refine and tailor your content to suit your industry and role.",
  },
  {
    title: "ResumeUp Score",
    description: "Get a detailed score and insights to improve your resume.",
  },
];

const builderFeatures = [
  {
    title: "ATS-friendly Templates",
    description:
      "Choose from a variety of resume templates that are ATS-optimised so that you won’t miss out on a chance to land your first interview",
  },
  {
    title: "Powerful Editor",
    description: "Customize your resume with our intuitive and flexible editor.",
  },
  {
    title: "Instant Preview",
    description: "See your changes reflected instantly as you build your resume.",
  },
  {
    title: "Content Suggestions",
    description: "Get AI-powered suggestions to improve your resume content.",
  },
];
  return (
    <div className="w-full bg-white">
      <div className="hero-section w-full min-h-screen flex flex-col lg:flex-row">
        <div className="w-full py-6 md:py-8 lg:py-11 px-4 md:px-6 lg:px-0">
            <div className="ml-6 md:ml-10 lg:ml-8 xl:ml-34 mt-6 lg:mt-10 xl:mt-10"> 
              <p className="text-3xl lg:text-[35px] xl:text-[38px] font-bold text-black leading-snug lg:leading-[1.2]">Create your perfect resume in<br/>minutes with
                <span className="text-[#007FFF] ml-1">
                AI Resume <br/> Builder
                </span></p>
            </div>
            <div className="block text-[14px] font-medium text-black/70 ml-5 lg:ml-7 xl:ml-34 mt-4 lg:mt-4 md:ml-9">
              <span className="mr-1.5 inline-flex items-center justify-center w-4 h-4  text-green-600">✓</span>
              ATS Friendly 
              <span className="mx-1.5 inline-flex items-center justify-center w-4 h-4  text-green-600 ml-4">✓</span>
              AI Resume Editor
            </div>
            <div className="block text-[17px] mt-3 font-medium text-black/70 ml-6 md:ml-10 lg:ml-8 xl:ml-34">
              <p>Boost your interview chances by 3x with Hirelens.AI's AI Resume Builder.<br/>
                Effortlessly create your professional, ATS-friendly resume in minutes, for free!</p>
            </div>
            <br />
            <div className="flex items-center gap-2 ml-6 md:ml-10 lg:ml-8 xl:ml-34">
              <Button className="bg-[#0000FF] text-[14px] h-[45px] w-[180px] hover:bg-[#0000FF]" asChild>
                {isAuthenticated ? (
                  <Link href="/dashboard">Build Resume with AI</Link>
                ) : (
                  <RegisterLink>Build Resume with AI</RegisterLink>
                )}
              </Button>
              <Button className="bg-white border-2 border-[#0000FF] text-[#0000FF] hover:bg-white text-[14px] h-[44px] w-[179px] ml-3" asChild>
                {isAuthenticated ? (
                  <Link href="/ats-score">Check ATS Score</Link>
                ) : (
                  <RegisterLink>Check ATS Score</RegisterLink>
                )}
              </Button>
            </div>
        {/* Social Proof Section */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-6 w-full max-w-5xl mx-auto px-4 gap-4">

            {/* Left side: Avatars + Stars */}
              <div className="flex items-center gap-4 ml-30">
            {/* Overlapping Avatars */}
            <div className="flex -space-x-3">
  <Image
    src="/images/user1.jpg"
    alt="User 1"
    width={40}
    height={40}
    className="w-8 h-8 rounded-full border-2 border-white object-cover"
  />
  <Image
    src="/images/user2.png"
    alt="User 2"
    width={40}
    height={40}
    className="w-8 h-8 rounded-full border-2 border-white object-cover"
  />
  <Image
    src="/images/user3.jpg"
    alt="User 3"
    width={40}
    height={40}
    className="w-8 h-8 rounded-full border-2 border-white object-cover"
  />
  <Image
    src="/images/user4.jpg"
    alt="User 4"
    width={40}
    height={40}
    className="w-8 h-8 rounded-full border-2 border-white object-cover"
  />
  <Image
    src="/images/user5.png"
    alt="User 5"
    width={40}
    height={40}
    className="w-8 h-8 rounded-full border-2 border-white object-cover"
  />
</div>

            {/* Stars and Text */}
                <div className="flex flex-col">
                  <div className="flex text-yellow-400 text-lg text-[28px]">
                    ★★★★★
                  </div>
                  <p className="font-bold text-[16px] ml-1 text-gray-800">Build a polished resume<br/>in 10 minutes</p>
                </div>
              </div>

          {/* Right side: Product Hunt Badge */}
              <div className="flex items-center bg-white border border-gray-300 rounded-lg px-5 py-1 shadow-sm mb-3 mx-auto">
                <Image src="/images/applicant.png" alt="Product" width={40} height={40} />
                <div className="ml-2 text-sm text-gray-800">
                  <p className="text-[10px] font-semibold text-gray-500">PRODUCT HUNT</p>
                  <p className="text-[14px] font-bold text-black">No More Blank Pages</p>
                </div>
              </div>
            </div>
        </div>
        <div className="w-full max-w-4xl mx-auto lg:mt-12 lg:mr-0 xl:mt-12 xl:mr-12">
          <div className="relative h-[400px] md:h-[500px] w-full rounded-lg">
            <Image
              src="/images/board-img.png"
              alt="Resume Example"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
      <h2 className="text-[16px] md:text-[20px] text-black font-semibold  ml-34 mt-[-170px]">
      Professionally Built, Globally Recognized Resumes
      </h2>

      {/* Logos Row */}
      <div className="flex justify-center w-full  mt-12"> {/* Outer container to center everything */}
        <div className="flex justify-center items-center gap-30 max-w-4xl mx-auto">
          <Image src="/images/ic_google.svg" alt="Google" width={100} height={50} className="object-contain" />
          <Image src="/images/ic_amazon.svg" alt="Amazon" width={100} height={50} className="object-contain" />
          <Image src="/images/ic_microsoft.svg" alt="Microsoft" width={100} height={50} className="object-contain" />
          <Image src="/images/ic_ibm.svg" alt="IBM" width={100} height={50} className="object-contain" />
          <Image src="/images/ic_deloitte.svg" alt="Deloitte" width={100} height={50} className="object-contain" />
          <Image src="/images/ic_uber.svg" alt="Deloitte" width={100} height={50} className="object-contain" />
        </div>
      </div>

      {/* Streamline Your Resume Creation Section */}
      <div className="w-full bg-white py-16 px-4 md:px-6 lg:px-8 mt-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-semibold text-gray-900 mb-4">
              Streamline Your Resume Creation with HireLens.AI
            </h2>
            <p className="text-lg text-gray-600 whitespace-nowrap overflow-x-auto pb-2">
              Avoid resume mistakes, get the perfect format, and boost your chances of landing interviews. With HireLens.AI's AI-powered <br/>platform, creating a professional resume has never been easier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 01 */}
            <div className="bg-white p-8 border-t-4 border-yellow-500 transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
              <div className="flex flex-col mb-4">
                <span className="text-3xl font-bold text-yellow-500 mb-8">01</span>
                  <div className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-yellow-500" />
                      <h3 className="text-[16px] font-semibold text-gray-900">Choose a Template</h3>
                  </div>
              </div>
              <p className="text-gray-600 text-[14px] text-base">
                Choose from our wide range of free, professionally designed resume templates that are optimized for passing ATS systems.
              </p>
            </div>

           {/* Step 02 */}
            <div className="bg-white p-8 border-t-4 border-blue-500 transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
              <div className="flex flex-col mb-4">
                <span className="text-3xl font-bold text-blue-500 mb-8">02</span>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-blue-500" />
                      <h3 className="text-[16px] font-semibold text-gray-900">Edit and Optimize with AI</h3>
                  </div>
              </div>
              <p className="text-gray-600 text-[13px] text-base">
                Our advanced AI Resume writer helps to refine and enhance your resume. Get personalized suggestions to improve quality and correct resume mistakes.
              </p>
            </div>

            {/* Step 03 */}
            <div className="bg-white p-8 border-t-4 border-green-500 transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
              <div className="flex flex-col mb-4">
                <span className="text-3xl font-bold text-green-500 mb-8">03</span>
                  <div className="flex items-center gap-2">
                    <Download className="h-6 w-6 text-green-500" />
                    <h3 className="text-[16px] font-semibold text-gray-900">Download Resume</h3>
                  </div>
              </div>
              <p className="text-gray-600 text-[13px] text-base">
                Review your resume score to ensure it's optimized for ATS and proceed with downloading in your preferred resume format.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Explore Resume Examples Section */}
      <div className="w-full  py-12 px-4 md:px-6 lg:px-8 mt-18">
        <div className="max-w-6xl min-h-[500px] text-center flex flex-col justify-center items-center bg-gray-100 mx-auto">
          <h2 className="text-2xl md:text-[25px]  text-black text-center mb-12">
            Explore Resume Examples from Your Profession
          </h2>

        {/* Profession Grid - First Row */}
          <div className="flex flex-wrap justify-center gap-4 mb-7">
            {[
              { text: 'Marketing', width: 'w-32', color: 'text-green-600' },
              { text: 'Software development', width: 'w-48', color: 'text-blue-600' },
              { text: 'Acting', width: 'w-24', color: 'text-yellow-600' },
              { text: 'Fashion Industry', width: 'w-40', color: 'text-red-600' },
              { text: 'Finance', width: 'w-28', color: 'text-green-600' },
              { text: 'IT', width: 'w-20', color: 'text-yellow-600' }
            ].map((item) => (
            <div 
              key={item.text}
              className={`${item.width} bg-white p-3 rounded-lg text-center cursor-pointer transition-all duration-200 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-1 border border-gray-100 group`}
            >
              <p className={`font-medium ${item.color} group-hover:${item.color.replace('00','50')} whitespace-nowrap`}>
                {item.text}
              </p>
            </div>
            ))}
          </div>

          {/* Profession Grid - Second Row */}
          <div className="flex flex-wrap justify-center gap-4 mb-7">
            {[
              { text: 'Product management', width: 'w-52', color: 'text-yellow-600' },
              { text: 'Graphic design', width: 'w-36', color: 'text-green-600' },
              { text: 'Customer success', width: 'w-44', color: 'text-blue-600' },
              { text: 'High school', width: 'w-32', color: 'text-purple-600' },
              { text: 'College student', width: 'w-40', color: 'text-yellow-600' },
              { text: '', width: 'w-20', color: 'text-yellow-600' }
            ].map((item, index) => (
            <div 
              key={item.text || `empty-${index}`}
              className={`${item.width} bg-white p-3 rounded-lg text-center cursor-pointer transition-all duration-200 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-1 border border-gray-100 group ${!item.text ? 'opacity-0 pointer-events-none' : ''}`}
            >
              {item.text && (
              <p className={`font-medium ${item.color} group-hover:${item.color.replace('00','50')} whitespace-nowrap`}>
              {item.text}
              </p>
              )}
            </div>
            ))}
        </div>

    {/* List Items */}
    <div className="flex flex-wrap justify-center gap-4 mb-4">
      {[
        { text: 'UI UX Design', width: 'w-36', color: 'text-indigo-600' },
        { text: 'Doctor', width: 'w-24', color: 'text-red-600' },
        { text: 'Nurse', width: 'w-24', color: 'text-red-500' },
        { text: 'Ethical Hacker', width: 'w-40', color: 'text-blue-700' },
        { text: 'Architect', width: 'w-32', color: 'text-amber-600' }
      ].map((item) => (
        <div 
          key={item.text}
          className={`${item.width} bg-white px-5 py-2 rounded-md cursor-pointer transition-all duration-200 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-1 border border-gray-100 group`}
        >
          <p className={`font-medium ${item.color} group-hover:${item.color.replace('00','50')} whitespace-nowrap`}>
            {item.text}
          </p>
        </div>
      ))}
    </div>

    {/* Divider */}
    <div className="border-t border-gray-200 my-6 w-full max-w-2xl mx-auto"></div>

    {/* See all categories link */}

      <div className="text-center">
        <p className="text-[20px] text-gray-800 cursor-pointer transition-colors flex items-center justify-center mx-auto group">
        See all categories
        <ArrowUpRight className="ml-1 mb-1 h-7 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </p>
      </div>
    </div>
  </div>
  {/* Explore Features Section */}
  <div className="w-full bg-white py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore What You Can Do with HireLens.AI
          </h2>
          <p className="text-lg text-gray-600 whitespace-nowrap overflow-x-auto pb-2">
            Let us handle your resume building process while you focus on interview preparation. 
            HireLens.AI simplifies the entire process by providing all the<br/>essential tools you need 
            for your career success - Resume building, analysis, LinkedIn optimisation, job tracker and many more.
          </p>
        </div>

        {/* Resume Builder Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Card - Resume Builder */}
            <div className="bg-blue-50 p-8  transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
              <div className="mb-5">
                <FileText className="h-8 w-8 text-blue-600" />
                <h3 className="text-[16px] font-semibold text-gray-900 mt-4">Resume Builder</h3>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                <svg className="h-1 w-2 text-black mt-2 mr-2" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" />
                </svg>
                  <span className="text-gray-800 text-[14px]">Access 20+ Professional ATS Resume Templates</span>
                </li>
                <li className="flex items-start">
                <svg className="h-1 w-2 text-black mt-2 mr-2" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" />
                </svg>
                  <span className="text-gray-800 text-[14px]">Build your resume with AI powered suggestions</span>
                </li>
                <li className="flex items-start">
                <svg className="h-1 w-2 text-black mt-2 mr-2" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" />
                </svg>
                  <span className="text-gray-800 text-[14px]">Instantly preview your resume while you customize it</span>
                </li>
              </ul>
              <div className="text-left">
              <p className="mt-4 text-blue-600  cursor-pointer font-semibold text-[16px] h-[45px] flex w-[120px] ">
                {isAuthenticated ? (
                  <Link href="/dashboard" className="w-full h-full flex items-center justify-center gap-1">
                        Build resume <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  ) : (
                  <RegisterLink className="w-full h-full flex items-center justify-center gap-1">
                    Build resume <ArrowUpRight className="h-4 w-4" />
                  </RegisterLink>
                  )}
              </p>
              </div>
            </div>

            {/* Right Card - Resume Analysis */}
            <div className="bg-green-50 p-8 transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
              <div className="mb-5">
                <Search className="h-8 w-8 text-green-600" />
                <h3 className="text-[16px] font-semibold text-gray-900 mt-4">Resume Analysis</h3>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                <svg className="h-1 w-2 text-black mt-2 mr-2" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" />
                </svg>
                  <span className="text-gray-800 text-[14px]">Ensure your resume passes ATS checks</span>
                </li>
                <li className="flex items-start">
                <svg className="h-1 w-2 text-black mt-2 mr-2" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" />
                </svg>
                  <span className="text-gray-800 text-[14px]">Receive a resume score with actionable improvement tips</span>
                </li>
                <li className="flex items-start">
                <svg className="h-1 w-2 text-black mt-2 mr-2" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" />
                </svg>
                  <span className="text-gray-800 text-[14px]">Optimize content and layout for better results</span>
                </li>
              </ul>
              <div className="text-left">
                <p className="mt-4 text-green-600 cursor-pointer font-semibold text-[16px] h-[45px] flex w-[140px]">
                <Link href="/ats-score" className="w-full h-full flex items-center gap-1">
                  Analyse resume <ArrowUpRight className="h-4 w-4" />
                </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Second Row - Two More Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* AI Powered Optimization */}
            <div className="bg-purple-50 p-8 transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
              <div className="mb-5">
                <Wand2 className="h-8 w-8 text-purple-600" />
                <h3 className="text-[16px] font-semibold text-gray-900 mt-4">AI Powered Optimization</h3>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                <svg className="h-1 w-2 text-black mt-2 mr-2" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" />
                </svg>
                  <span className="text-gray-800 text-[14px]">Let AI optimize keywords to match job descriptions</span>
                </li>
                <li className="flex items-start">
                <svg className="h-1 w-2 text-black mt-2 mr-2" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" />
                </svg>
                  <span className="text-gray-800 text-[14px]">Enhance your resume's visibility with ATS systems</span>
                </li>
                <li className="flex items-start">
                <svg className="h-1 w-2 text-black mt-2 mr-2" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" />
                </svg>
                  <span className="text-gray-800 text-[14px]">Improve chances of reaching hiring managers</span>
                </li>
              </ul>
              <div className="text-left">
                <p className="mt-4 text-purple-600 cursor-pointer font-semibold text-[16px] h-[45px] flex w-[160px]">
                <Link href="/bullet-generator" className="w-full h-full flex items-center gap-1">
                  Optimize resume <ArrowUpRight className="h-4 w-4" />
                </Link>
                </p>
              </div>
            </div>

            {/* LinkedIn Optimization */}
            <div className="bg-blue-50 p-8 transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
              <div className="mb-5">
                <Linkedin className="h-8 w-8 text-blue-600" />
                <h3 className="text-[16px] mt-4 font-semibold text-gray-900">LinkedIn Optimization</h3>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                <svg className="h-1 w-2 text-black mt-2 mr-2" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" />
                </svg>
                  <span className="text-gray-700">Optimize your LinkedIn profile to support your resume</span>
                </li>
                <li className="flex items-start">
                <svg className="h-1 w-2 text-black mt-2 mr-2" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" />
                </svg>
                  <span className="text-gray-700">Enhance your online visibility to recruiters</span>
                </li>
                <li className="flex items-start">
                <svg className="h-1 w-2 text-black mt-2 mr-2" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="4" />
                </svg>
                  <span className="text-gray-700">Add jobs to job tracker directly from LinkedIn</span>
                </li>
              </ul>
              <div className="text-left">
                <p className="mt-4 text-blue-600 cursor-pointer font-semibold text-[16px] h-[45px] flex w-[160px]">
                <Link href="/dashboard" className="w-full h-full flex items-center gap-1">
                  Optimize Linkedin <ArrowUpRight className="h-4 w-4" />
                </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-10 items-center">
        {/* Text + Dropdown Section */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold mb-4 ml-2">Build Your Perfect ATS-Friendly Resume</h2>
          <p className="wraptext-gray-600 mb-8 ml-2">
            Creating a resume that stands out has never been easier. But with ResumeUp.AI’s powerful Resume
            Builder, you can craft a professional and ATS-friendly resume in minutes.
          </p>

          {/* Image for Mobile View */}
          <div className="block md:hidden mb-8">
            <Image
              src="/images/ats_friendly.webp"
              alt="Resume Preview"
              width={400}
              height={500}
            />
          </div>

          {builderFeatures.map((feature, index) => (
  <div
    key={index}
    className="bg-gray-50 p-6 rounded-lg cursor-pointer shadow-sm transition-all duration-300"
    onClick={() => setBuilderIndex(builderIndex === index ? null : index)}
  >
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
      {builderIndex === index ? (
        <ChevronDown className="text-blue-600" />
      ) : (
        <ChevronRight className="text-blue-600" />
      )}
    </div>
    <div
      className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
        builderIndex === index ? 'grid-rows-[1fr] mt-2' : 'grid-rows-[0fr]'
      }`}
    >
      <p className="text-sm text-gray-700 overflow-hidden">{feature.description}</p>
    </div>
  </div>
))}

          <div className="mt-10">
          <p className="mt-4 w-fit bg-white ml-4 border border-blue-500 text-blue-600 font-semibold px-4 py-1.5 rounded-md flex items-center gap-2">
                {isAuthenticated ? (
                  <Link href="/dashboard" className="w-full h-full flex items-center justify-center gap-1">
                        Build resume <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  ) : (
                  <RegisterLink className="w-full h-full flex items-center justify-center gap-1">
                    Build resume <ArrowUpRight className="h-4 w-4" />
                  </RegisterLink>
                  )}
              </p>
          </div>
        </div>

        {/* Image for Desktop View */}
        <div className="order-1 md:order-2 hidden md:flex justify-center md:justify-end mb-6 md:mb-0">
          <Image
            src="/images/ats_friendly.webp"
            alt="Resume Preview"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>



    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-10 items-center">
        {/* Text + Dropdown Section */}
        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold mb-4 ml-2">Optimize Your Resume with Our Advanced Resume Checker</h2>
          <p className="wraptext-gray-600 mb-8 ml-2">
          Ensure your resume meets the standards with our Resume Checker tool. Our advanced AI technology scans your resume for common errors, and ATS optimization tips and provides personalized suggestions.
          </p>

          {/* Image for Mobile View */}
          <div className="block md:hidden mb-8">
            <Image
              src="/images/resume-optimize.webp"
              alt="Resume Preview"
              width={400}
              height={500}
            />
          </div>

          {atsFeatures.map((feature, index) => (
  <div
    key={index}
    className="bg-gray-50 p-6 rounded-lg cursor-pointer shadow-sm transition-all duration-300"
    onClick={() => setAtsIndex(atsIndex === index ? null : index)}
  >
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
      {atsIndex === index ? (
        <ChevronDown className="text-blue-600" />
      ) : (
        <ChevronRight className="text-blue-600" />
      )}
    </div>
    <div
      className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
        atsIndex === index ? 'grid-rows-[1fr] mt-2' : 'grid-rows-[0fr]'
      }`}
    >
      <p className="text-sm text-gray-700 overflow-hidden">{feature.description}</p>
    </div>
  </div>
))}


          <div className="mt-10">
            <Link
              href="/ats-score"
              className="w-fit ml-4 bg-white border border-blue-500 text-blue-600 font-semibold px-4 py-1.5 rounded-md flex items-center gap-2">
              Check Your Resume <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Image for Desktop View */}
        <div className="order-1 md:order-2 hidden md:flex justify-center md:justify-end mb-6 md:mb-0">
          <Image
            src="/images/resume-optimize.webp"
            alt="Resume Preview"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>

    <footer className="bg-black text-white py-12 px-6">
    <div className="max-w-6xl mx-auto">
    {/* Columns - Flex layout for exact spacing */}
    <div className="flex flex-col md:flex-row gap-12 mb-8">
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
      <img
              src="/images/applicant.png"
              alt="CVbuild.ai Logo"
              className="h-6 w-6 object-contain"
            />
      <h1 className="text-[18px] font-bold text-[blue] ">HireLens.ai</h1>
      </div>
      <p className="text-[14px] leading-relaxed">
        Build the best resume in minutes with our <br/>AI Resume Builder! Get a powerful Resume <br/>Editor and an ATS Resume Checker to <br/>ensure your resume stands out!
      </p>
    </div>
      {/* FREE TOOLS Column */}
      <div className="flex-1 ml-26">
        <h2 className="text-[14px] font-bold mb-4">FREE TOOLS</h2>
        <ul className="text-[14px] space-y-2">
          <li>ATS Resume Checker</li>
          <li>Resume Bullet Point Generator</li>
          <li>Resume Skills Generator</li>
          <li>Resume Objective Generator</li>
        </ul>
      </div>

      {/* LINKS Column */}
      <div className="flex-1 ml-20">
        <h2 className="text-[14px] font-bold mb-4">LINKS</h2>
        <ul className="text-[14px] space-y-2">
          <li>Support</li>
          <li>Terms of services</li>
          <li>Privacy policy</li>
          <li>Refund policy</li>
        </ul>
      </div>

      {/* GET IN TOUCH Column */}
      <div className="flex-2">
        <h2 className="text-[14px] font-bold mb-4">GET IN TOUCH</h2>
        <div className="text-[14px] space-y-1">
          <p>Team HireLens,</p>
          <p>Invertis University,</p>
          <p>Lucknow Highway Road, Bareilly</p>
          <p>UttarPradesh, India - 243001</p>
        </div>
      </div>
    </div>

    {/* Copyright - Centered */}
    <div className="text-[14px] text-center border-t border-gray-300 pt-6">
      Copyright © 2025 - All rights reserved
    </div>
  </div>
</footer>

  </div>
  );
}