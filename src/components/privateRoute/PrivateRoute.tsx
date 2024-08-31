"use client";
import { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/utils";
import LoadingSpinner from "../common/loadingSpinner/LoadingSpinner";

const PrivateRoute = (WrappedComponent: ComponentType<any>) => {
  const WithAuth = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      if (!isAuthenticated()) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuth;
};

export default PrivateRoute;
