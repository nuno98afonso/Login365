"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

import officeLogo from "../public/Office_365.png";



export function OfficeSignInButton() {
  const handleClick = () => {
    signIn("microsoft-entra-id");
  };

  return (
    <button onClick={handleClick} className="w-full flex flex-col items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200">
      <Image src={officeLogo} alt="Office Logo" width={240} height={80} />
      <span className="ml-4">Continue with Office 365</span>
    </button>
  );
} 