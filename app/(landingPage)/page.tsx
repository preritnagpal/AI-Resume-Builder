'use client';

import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { FileText, Sparkles, Download} from "lucide-react";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Home() {
  const { isAuthenticated } = useKindeBrowserClient();


  return (
    <div className="w-full bg-white overflow-x-hidden">
      <div className="hero-section w-full min-h-screen flex flex-col bg-[#1a5ce0] lg:flex-row">
        <div className="w-full py-6 md:py-8 lg:py-11 px-4 md:px-6 lg:px-0 bg-[#1a5ce0]">
            <div className="ml-2 mt-28 md:ml-1 lg:ml-7 xl:ml-34  lg:mt-30 xl:mt-38"> 
              <p className="text-5xl lg:text-6xl font-bold text-white leading-snug">HireLens</p>
            </div>
            <div className="block text-[14px] font-medium text-white ml-2 mt-4 md:ml-1 lg:ml-7 xl:ml-34 ">
              <span className="mr-1.5 inline-flex items-center justify-center w-4 h-4  text-white">✓</span>
              ATS Friendly 
              <span className="mx-1.5 inline-flex items-center justify-center w-4 h-4  text-white ml-4">✓</span>
              AI Resume Editor
            </div>
            <div className="block text-[16px] md:text-[18px] lg:text-[20px] mt-4 font-medium text-white ml-2 md:ml-1 lg:ml-7 xl:ml-34">
              <p><span className="block font-bold text-[20px] lg:text-[22px] ">Intelligent Hiring Starts with Clear Vision</span><br/>
              Boost your interview rate by 3x with HireLens.ai, Build powerful, ATS-friendly resumes in minutes — no experience needed.</p>
            </div>
            <br />
            <div className="flex items-center gap-2 ml-2  md:ml-1 lg:ml-7 xl:ml-34">
              <Button className="bg-white text-[#1a5ce0] text-[14px] font-bold h-[45px] w-[180px] hover:bg-[#1a5ce0] border-2 hover:border-white hover:text-white" asChild>
                {isAuthenticated ? (
                  <Link href="/dashboard">Build Resume with AI</Link>
                ) : (
                  <RegisterLink>Build Resume with AI</RegisterLink>
                )}
              </Button>
              <Button className="bg-[#1a5ce0] border-2 border-white/20 hover:border-white/60 text-white hover:bg-[#1a5ce0] font-bold hover:text-white text-[14px] h-[44px] w-[179px] ml-3" asChild>
                {isAuthenticated ? (
                  <Link href="/ats-score">Check ATS Score</Link>
                ) : (
                  <RegisterLink>Check ATS Score</RegisterLink>
                )}
              </Button>
            </div>
        </div>
        <div className="w-full max-w-4xl mx-auto relative lg:mt-12 lg:mr-0 xl:mt-12 xl:mr-12">
          <div className="relative h-[300px] md:h-[450px] w-full mt-14 rounded-lg z-10">
          <Image
          src="/images/resume-optimize.webp"
          alt="Resume Example"
          fill
          className="object-contain rounded-lg h-[400px]"
          />
          </div>
        </div>
      </div>


      {/*section two*/}
      <div id="services" className="w-full bg-white py-16 px-4 md:px-6 lg:px-8 mt-8">
        <div className="max-w-6xl mx-auto">

          <div className="text-center">
            <p className="text-[#1a5ce0] text-[18px] font-bold">Services</p>
            <p className="text-black text-[40px] font-bold mb-2">What we offer</p>
            <p className="text-gray-800">From AI-powered resume analysis to ATS-friendly templates, we provide everything you need to craft a standout resume.<br className="sm:hidden"/> Get personalized insights, real-time previews, and job-winning suggestions — all in one place.</p>
          </div>
          {/* Services Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:gap-30 bg-white p-6">
            <div className="relative h-[400px] sm:ml-26 md:ml-34 lg:h-[500px] w-[400px] lg:w-full lg:ml-0">
            <Image
            src="/images/resume-builder.png"
            alt="Resume Example"
            fill
            className="object-contain rounded-lg"
            />
            </div>

            <div className="mt-[-10px] mb-20 md:mt-0 md:mb-40 lg:mb-0">
            <p className="text-[#1a5ce0] text-[20px] font-bold mb-6">01.</p>
            <p className="text-4xl font-bold text-black mb-4">Resume Builder</p>
            <p className="text-[18px] text-justify text-gray-800 tracking-wide mb-4">Access 10+ professional, ATS-optimized resume templates and build your resume with AI-powered suggestions tailored to your profile. Instantly preview changes as you customize your resume in real-time, making the creation process fast, efficient, and stress-free.</p>
            <button className="px-5 py-2 border font-semibold border-[#1a5ce0] text-[#1a5ce0] rounded-md hover:bg-[#1a5ce0] hover:text-white transition">
              {isAuthenticated ? (
                  <Link href="/dashboard">Build Resume</Link>
                ) : (
                  <RegisterLink>Build Resume</RegisterLink>
                )}
            </button>
            </div>
          </div>



        <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:gap-30 mt-[-20px] md:mb-20 lg:mb-0 xl:mt-0 bg-white p-6">
         {/* Left: Text Content */}
          <div>
          <p className="text-[#1a5ce0] text-[20px] font-bold mb-6">02.</p>
          <p className="text-4xl font-bold text-black mb-4">Resume Analysis</p>
          <p className="text-[18px] text-justify text-gray-800 mb-4 tracking-wide">
          Ensure your resume passes ATS checks with ease. Receive a comprehensive resume score along with actionable tips to improve both content and structure. Optimize your layout and wording to increase your chances of landing interviews and standing out to recruiters."
          </p>
          <button className="px-5 py-2 border font-semibold border-[#1a5ce0] text-[#1a5ce0] rounded-md hover:bg-[#1a5ce0] hover:text-white transition">
                {isAuthenticated ? (
                  <Link href="/ats-score">Scan Resume</Link>
                ) : (
                  <RegisterLink>Scan Resume</RegisterLink>
                )}
          </button>
          </div>

          {/* Right: Bigger, Rounded Image */}
          <div className="relative h-[400px] sm:ml-26  w-[400px] md:w-full md:ml-6 md:mt-10 lg:mt-0 lg:ml-0">
            <Image
            src="/images/ATS.jpg"
            alt="Resume Example"
            fill
            className="object-contain rounded-lg"
            />
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:gap-30 mt-[-20px] bg-white p-6 mb-30 lg:mb-0 xl:mt-10">
            <div className="relative h-[400px] sm:ml-26 md:ml-36 lg:ml-0 w-[400px] lg:w-full">
            <Image
            src="/images/optimize.webp"
            alt="Resume Example"
            fill
            className="object-contain rounded-lg"
            />
            </div>

            <div className="mt-[-10px] mb-20 md:mt-0 md:mb-0">
            <p className="text-[#1a5ce0] text-[20px] font-bold mb-6">03.</p>
            <p className="text-4xl font-bold text-black mb-4">Bullet Point Generator</p>
            <p className="text-[18px] text-justify text-gray-800 tracking-wide mb-4">Craft impactful resume bullet points in seconds. Our generator helps you turn job duties into achievement-driven statements using powerful action verbs and clear results. Enhance clarity, highlight your strengths, and tailor content to impress recruiters and pass ATS checks effortlessly.</p>
            <Link href="/bullet-generator">
            <button className="px-5 py-2 border font-semibold border-[#1a5ce0] text-[#1a5ce0] rounded-md hover:bg-[#1a5ce0] hover:text-white transition">
              Generate
            </button>
            </Link>

            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:gap-30 mt-[-20px] xl:mt-0 bg-white p-6">
         {/* Left: Text Content */}
          <div>
          <p className="text-[#1a5ce0] text-[20px] font-bold mb-6">04.</p>
          <p className="text-4xl font-bold text-black mb-4">Summary Generator</p>
          <p className="text-[18px] text-justify text-gray-800 mb-4 tracking-wide">
          Create a compelling professional summary that captures your strengths, experience, and career goals. Our generator crafts tailored summaries to match your industry and role, helping you make a strong first impression. Stand out to recruiters with a concise, impactful overview of who you are.
          </p>
          <Link href="/summary-generator">
          <button className="px-5 py-2 border font-semibold border-[#1a5ce0] text-[#1a5ce0] rounded-md hover:bg-[#1a5ce0] hover:text-white transition">
          Generate
          </button>
          </Link>
          </div>

          {/* Right: Bigger, Rounded Image */}
          <div className="relative h-[400px] sm:ml-26 md:ml-34 w-[400px] lg:w-full ml-0 lg:ml-0">
            <Image
            src="/images/summary.png"
            alt="Resume Example"
            fill
            className="object-contain rounded-lg"
            />
          </div>
        </div>

      </div>
    </div>

      {/* Streamline Your Resume Creation Section */}
      <div id="why" className="w-full bg-white py-16 px-4 md:px-6 md:mt-[-120px] lg:mt-[-80px] mt-[-140px] lg:px-8">
        <div className="max-w-6xl mx-auto">
        <div className="bg-gray-50 py-16 px-4 text-center">
      <p className="text-[#1a5ce0] text-[18px] font-bold">Why Choose Me</p>
      <p className="text-black text-[40px] font-bold mb-4">Craft Resumes That Get Noticed</p>
      <p className="text-gray-800">
      Avoid resume mistakes, get the perfect format, and boost your chances of landing interviews. With HireLens.AI's AI-powered <br className="hidden lg:block"/>platform, creating a professional resume has never been easier.
      </p>      
    </div>

          <div className="grid grid-cols-1 mt-12 mb-10 xl:grid-cols-3 gap-8">
            {/* Step 01 */}
            <div className="bg-white sm:ml-34 md:ml-40 lg:ml-72 xl:ml-0 sm:w-[400px] xl:w-full p-8 border-t-4 border-yellow-500 transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
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
            <div className="bg-white p-8 sm:ml-34 md:ml-40 lg:ml-72 xl:ml-0 sm:w-[400px] xl:w-full border-t-4 border-[#1a5ce0] transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
              <div className="flex flex-col mb-4">
                <span className="text-3xl font-bold text-[#1a5ce0] mb-8">02</span>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-[#1a5ce0]" />
                      <h3 className="text-[16px] font-semibold text-gray-900">Edit and Optimize with AI</h3>
                  </div>
              </div>
              <p className="text-gray-600 text-[13px] text-base">
                Our advanced AI Resume writer helps to refine and enhance your resume. Get personalized suggestions to improve quality and correct resume mistakes.
              </p>
            </div>

            {/* Step 03 */}
            <div className="bg-white sm:ml-34 md:ml-40 sm:w-[400px] lg:ml-72 xl:w-full xl:ml-0 p-8 border-t-4 border-green-500 transition-all duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg">
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


      <div id="contact">
        <ContactForm />
      </div>

      <footer className="bg-[#1e252d] text-white py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col ml-20 lg:ml-10 xl:ml-20 lg:flex-row justify-between gap-10">

          {/* Logo & Description */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
            <img
              src="/images/applicant.png"
              alt="HireLens.ai Logo"
              className="h-7 w-7 md:h-9 md:w-9 object-contain"
            />
              <div>
                <h1 className="text-[20px] font-bold">HireLens</h1>
                <p className="text-[12px]">Clarity in Every Hire</p>
              </div>
            </div>
            <p className="text-[14px] text-gray-200 overflow-wrap break-word">
            HireLens empowers smarter hiring through clear insights and intelligent tools.
            Bring clarity to your recruitment process with HireLens.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex-1">
            <h2 className="text-[20px] font-bold mb-4">Contact Info</h2>
            <div className="text-[14px] text-gray-200 space-y-3 mt-9">
              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1" />
                123 Fifth Avenue, New York,<br/> NY 10160, United States.
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt /> +91 9690058658
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt /> +91 9690058658
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope /> hirelensairesume@gmail.com
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="flex-1">
            <h2 className="text-[20px] font-bold mb-4">Services</h2>
            <ul className="text-[14px] list-none text-gray-200 space-y-2 mt-9 cursor-pointer">
            <li className="relative pl-5 before:content-['>'] before:absolute before:left-0 list-style:none before:text-[#1a5ce0]">
            <Link href="/dashboard" className="hover:underline">AI Resume Builder</Link>
            </li>
            <li className="relative pl-5 before:content-['>'] before:absolute before:left-0 before:text-[#1a5ce0]">
            <Link href="/ats-score" className="hover:underline">Resume Checker</Link>
            </li>
            <li className="relative pl-5 before:content-['>'] before:absolute before:left-0 before:text-[#1a5ce0]">
            <Link href="/bullet-generator" className="hover:underline">Bullet Point Generator</Link>
            </li>
            <li className="relative pl-5 before:content-['>'] before:absolute before:left-0 before:text-[#1a5ce0]">
            <Link href="/summary-generator" className="hover:underline">Summary Generator</Link>
            </li>
            </ul>
          </div>

          {/* Get In Touch & Social Icons */}
          <div className="flex-1">
            <h2 className="text-[20px] font-bold mr-20 mb-4">Get In Touch</h2>
            <p className="text-[14px] text-gray-100 mb-4 mt-9 overflow-wrap break-word">
            We’d love to hear from you! Whether you have questions, feedback, or just want to say hello — feel free to reach out. Our team is here to help you every step of the way.


            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-white bg-[#3b5998] rounded-full p-2 hover:bg-blue-700"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-white bg-[#1da1f2] rounded-full p-2 hover:bg-blue-500"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-white bg-[#0077b5] rounded-full p-2 hover:bg-blue-600"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="text-white bg-[#f44336] rounded-full p-2 hover:bg-red-600"
              >
                <MdEmail />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-[15px] text-center text-gray-200 mt-25 border-t border-black pt-6 flex flex-col md:flex-row justify-between">
          <span className="md:ml-20">Copyright © 2025 HireLens</span>
          <span className="md:mr-8">Powered by HireLens</span>
        </div>
      </div>
    </footer>

  </div>
  );
}
