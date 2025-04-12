import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "@/components/nav-bar";
import ChatBot from '@/components/chatbot/ChatBot';


const LandingLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  
  return (
    <div>
      <NavBar />
      {children}
      <ChatBot />
    </div>
  );
};

export default LandingLayout;
