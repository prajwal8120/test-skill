import Cookies from "js-cookie";

export const currentUser = (): string => {
  const role = Cookies.get("role");
  console.log("role: ", role);
  if (role) {
    return role;
  }
  return "";
};
