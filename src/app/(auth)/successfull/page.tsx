"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function PasswordResetSuccess() {
  const route = useRouter();
  return (
    <div className="flex flex-col gap-8 sm:w-[75%] md:w-[50%] xl:w-[30%] md:m-auto">
      <div className="w-[360px] flex items-center justify-center flex-col">
        <div className=" bg-[#CDDBFF] rounded-full flexitems-center justify-center p-6 ">
          <div className=" bg-[#C6D5FF] rounded-full h-[97px] w-[97px] flex items-center justify-center">
            <Image
              src={"/images/carbon_security.svg"}
              width={48}
              height={48}
              alt="logo"
              className="block mx-auto"
            />
          </div>
        </div>
        <h1 className="text-[#3EAF3F] text-center mt-4">
          Password reset successfully
        </h1>
        <Button
          className="p-4 flex items-center justify-center w-[328px] bg-[#1C3268] text-white mt-6"
          onClick={() => route.push("/")}
        >
          Log in
        </Button>
      </div>
    </div>
  );
}

export default PasswordResetSuccess;
