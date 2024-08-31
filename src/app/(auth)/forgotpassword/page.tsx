"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import Alert from "@/components/common/alert/Alert";
function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [emailVerified, setEmailVerified] = useState<string>("");
  const [errorClose, setErrorClose] = useState<boolean>(false);
  const router = useRouter();

  const handleCheckPassword = async () => {
    try {
      const url = `/auth/forgot-password?email=${email}`;
      const res = await apiClient.post(url, email);
      if (email) {
        if (res.status === 200) {
          router.push(`/checkEmail?email=${email}`);
        }
      }
    } catch (e: any) {
      setErrorClose(true);
      setEmailVerified(e.response?.data?.title || "Somthing went wrong!");
      console.error("Error:", e);
    }
  };

  const handleEmalChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
    setErrorClose(false);
  };
  return (
    <div className="flex flex-col gap-8 sm:w-[75%] md:w-[50%] xl:w-[30%] md:m-auto ">
      <div>
        <h1 className="text-[#1C3268] text-3xl font-semibold">
          Forgot Password
        </h1>
        <h1 className="text-[#B8B8D2] text-base font-normal">
          Enter the email you used to create your account so we can send you
          instructions on how to reset your password.
        </h1>
      </div>
      {errorClose && (
        <Alert
          errorMessage={emailVerified}
          onClose={() => setErrorClose(false)}
        />
      )}

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email" className="text-[#1C3268] text-base font-medium">
          Enter Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Enter your email"
          onChange={handleEmalChange}
        />
      </div>

      <Button onClick={handleCheckPassword} className="bg-[#1C3268] text-white">
        Send Email
      </Button>
    </div>
  );
}

export default ForgotPassword;
