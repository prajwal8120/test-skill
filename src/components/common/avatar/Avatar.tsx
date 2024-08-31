// components/Avatar.tsx

import Image from "next/image";
import React from "react";

interface AvatarProps {
  name?: string;
  src?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, src }) => {
  const getInitials = (name?: string) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part[0].toUpperCase()).join("");
    return initials;
  };

  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FFF5F5] border border-[#1C3268]">
      {src ? (
        <Image
          className="w-full h-full rounded-full"
          src={src}
          alt={name || ""}
        />
      ) : (
        <span className="text-sm font-semibold text-[#1C3268]">
          {getInitials(name)}
        </span>
      )}
    </div>
  );
};

export default Avatar;
