"use client";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import React, { useState } from "react";
import { authPutRequest } from "@/lib/apiClient";
import Cookies from "js-cookie";
import Alert from "@/components/common/alert/Alert";
import { useRouter } from "next/navigation";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [conformNewPassword, setConformNewPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [errorClose, setErrorClose] = useState<boolean>(false);

  const route = useRouter();
  const handlenewPassword = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewPassword(e.target.value);
    setErrorClose(false);
  };
  const handleConformedPassword = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setConformNewPassword(e.target.value);
    setErrorClose(false);
  };
  const handleResetPassword = async () => {
    const token = Cookies.get("token");
    try {
      if (newPassword && conformNewPassword) {
        if (newPassword === conformNewPassword) {
          const res = await authPutRequest(
            `/auth/reset-password?token=${token}&newPassword=${newPassword}`,
            JSON.stringify({ newPassword })
          );
          route.push("/successfull");
        } else {
          setErrorClose(true);
          setErrorPassword("Passwords do not match");
        }
      } else {
        setErrorPassword("Both fields are required");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };
  return (
    <div className="flex flex-col gap-8 sm:w-[75%] md:w-[50%] xl:w-[30%] md:m-auto ">
      <h1 className="text-[#1C3268] text-3xl font-semibold ">Reset Password</h1>
      {errorClose && (
        <Alert
          errorMessage={errorPassword}
          onClose={() => setErrorClose(false)}
        />
      )}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email" className="text-[#1C3268] text-sm font-medium  ">
          Choose New Password
        </Label>
        <Input
          type="password"
          id="password"
          placeholder="Enter new password"
          onChange={handlenewPassword}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email" className="text-[#1C3268] text-sm font-medium ">
          Confirm New Password
        </Label>
        <Input
          type="password"
          id="password"
          placeholder="Enter confirmed password"
          onChange={handleConformedPassword}
        />
      </div>
      <Button
        className="p-[10px] flex align-center justify-center w-full bg-[#1C3268] text-white  font-medium"
        onClick={handleResetPassword}
      >
        Reset Password
      </Button>
    </div>
  );
}

export default ResetPassword;
