"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  return (
    <>
      <div className="w-[360px]">
        <div className="text-[#1C3268] text-3xl font-semibold">
          Check Your Email
        </div>
        <p className="text-[#9898AD] ">
          We have sent an email with password reset information to
          {` ${email ? email : "a****a@e***e.com"}`}
        </p>
        <p className="mt-14 mb-3 text-[#1C3268]">
          Didn’t receive the email? Check spam or promotion folder or
        </p>
        <Button className="p-[10px] flex align-center justify-center w-[328px] bg-[#1C3268] text-white">
          Resend Mail
        </Button>
      </div>
    </>
  );
};

export default Page;
