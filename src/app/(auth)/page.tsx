"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";
import Cookies from "js-cookie";
import Alert from "@/components/common/alert/Alert";
function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleChangeEmail = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(e.target.value);
    setIsError(false);
  };
  const handleChangePassword = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
    setIsError(false);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setRememberMe(checked);
  };
  const handleLogin = async () => {
    if (username && password) {
      try {
        setLoading(true);
        const res = await apiClient.post(
          "/auth/login",
          JSON.stringify({
            username,
            password,
            remember_me: rememberMe,
          })
        );

        if (await res?.data) {
          Cookies.set("token", res.data?.token, { expires: 7 });
          Cookies.set("reset", res.data?.reset, { expires: 7 });
          Cookies.set("role", res.data?.roleName, { expires: 7 });
          router.push("/dashboard");
        }
      } catch (error: any) {
        setLoading(false);
        if (error && error?.response?.data?.title == "Bad credentials") {
          setIsError(true);
        }
        console.error("Login failed", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 sm:w-[75%] md:w-[50%] xl:w-[30%] md:m-auto">
      <div>
        <h1 className="text-[#1C3268] text-3xl font-semibold">Log In</h1>
        <h1 className="text-[#B8B8D2] text-base font-normal">
          Please enter your details.
        </h1>
      </div>
      {isError && (
        <Alert
          onClose={() => setIsError(false)}
          errorMessage="The email and password you have entered is wrong."
        />
      )}

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email" className="text-[#1C3268] text-base font-medium">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Enter your email"
          onChange={handleChangeEmail}
          value={username}
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="password"
          className="text-[#1C3268] text-base font-medium"
        >
          Password
        </Label>
        <Input
          type="password"
          id="password"
          placeholder="******"
          onChange={handleChangePassword}
          value={password}
        />
      </div>

      <div className="flex  flex-row justify-between ">
        <div className="flex flex-row justify-center items-center">
          <Checkbox
            checked={rememberMe}
            onCheckedChange={(checked: boolean) =>
              handleCheckboxChange(checked)
            }
          />
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
      <Button className="bg-[#1C3268] text-white" onClick={handleLogin}>
        {loading ? "Loading..." : "Log in"}
      </Button>
    </div>
  );
}

export default SignIn;
