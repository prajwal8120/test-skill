"use client";
import Avatar from "@/components/common/avatar/Avatar";
import { authGetRequest } from "@/lib/apiClient";
import React, { useEffect, useState } from "react";

type ProfileType = {
  name: string;
  designation: string;
  // avatar: String;
};
const Navbar = () => {
  const [profileDetails, setProfileDetails] = useState<ProfileType | null>(
    null
  );

  useEffect(() => {
    const userNameDisplay = async () => {
      const res = await authGetRequest(`auth/profile`);
      setProfileDetails(res?.data);
    };
    userNameDisplay();
  }, []);

  function truncateName(name: string) {
    const maxLength = 10;
    if (name.length > maxLength) {
      return `${name.substring(0, maxLength)}...`;
    }
    return name ?? "";
  }

  return (
    <div className="flex justify-between pl-6 pr-10 py-3 items-center">
      <div />
      <div className="flex gap-2 items-center">
        <div>
          <Avatar name={profileDetails?.name} />
        </div>
        <div>
          <p className="text-[#1C3268]text-sm font-semibold">
            {profileDetails && truncateName(profileDetails?.name)}
          </p>
          <p className="text-[#B8B8D2] text-xs font-normal">
            {profileDetails?.designation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
