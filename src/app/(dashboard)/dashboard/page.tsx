"use client";

import AdminContainer from "@/components/dashbaord/admin/AdminContainer";
import ContentContainer from "@/components/dashbaord/content/ContentContainer";
import SuperAdminContainer from "@/components/dashbaord/superAdmin/SuperAdminContainer";
import { currentUser } from "@/lib/currentUser";
import React, { useEffect, useState } from "react";

function Page() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const role = currentUser();
    console.log("currentRole: ", role);
    setUser(role || null);
  }, []);

  return (
    <>
      {user === "ROLE_ADMIN" && <AdminContainer />}
      {user === "ROLE_SUPER_ADMIN" && <SuperAdminContainer />}
      {user === "ROLE_CONTENT" && <ContentContainer />}
      {user === null && <h1>Problem while loading dashboard</h1>}
    </>
  );
}

export default Page;
