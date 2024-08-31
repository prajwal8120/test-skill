import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return !!Cookies.get("token");
  }
  return false;
};
