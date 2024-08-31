"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useRouter } from "next/navigation";

function SignIn() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 sm:w-[75%] md:w-[50%] xl:w-[30%] md:m-auto">
      <div className="">
        <h1 className="text-[#1C3268] text-3xl font-semibold">Sign In</h1>
        <h1 className="text-[#B8B8D2] text-base font-normal">
          Please enter your details.
        </h1>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email" className="text-[#1C3268] text-base font-medium">
          Email
        </Label>
        <Input type="email" id="email" placeholder="Enter your email" />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="password"
          className="text-[#1C3268] text-base font-medium"
        >
          Password
        </Label>
        <Input type="password" id="password" placeholder="******" />
      </div>

      <div className="flex items-center justify-between ">
        <div>
          <Checkbox id="terms" />
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#B8B8D2] mx-2"
          >
            Remember for 30 days
          </Label>
        </div>
        <div>
          <Label
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1C3268] font-semibold cursor-pointer"
            onClick={() => router.push("/forgotpassword")}
          >
            Forgot password
          </Label>
        </div>
      </div>
      <Button className="bg-[#1C3268] text-white">Sign in</Button>
      <div className="flex items-center space-x-2 self-center">
        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#B8B8D2]">
          Don’t have an account?{" "}
          <span
            className="text-[#1C3268] font-semibold cursor-pointer"
            onClick={() => router.push("/")}
          >
            Log In
          </span>
        </Label>
      </div>
    </div>
  );
}

export default SignIn;
