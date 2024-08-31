import axios from "axios";
import Cookies from "js-cookie";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEMO_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res?.status == 401) {
      console.log("something went wrong");
    }
    console.error(
      "Looks like there was a problem. Status Code: " + res?.status
    );
    return Promise.reject(error);
  }
);

export const authPostRequest = async (
  url: string,
  data?: any,
  isFileUpload: boolean = false
) => {
  try {
    const token = Cookies.get("token");
    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (isFileUpload) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    const response = await apiClient.post(url, data || {}, config);
    return response;
  } catch (error) {
    console.error("Auth POST request failed:", error);
    throw error;
  }
};
export const authPutRequest = async (
  url: string,
  data: any,
  isFileUpload: boolean = false
) => {
  try {
    const token = Cookies.get("token");
    const config: any = {
      header: {
        Authorization: `Bearer ${token}`,
      },
    };
    if (isFileUpload) {
      config.header["Content-type"] = "multipart/form-data";
    }
    const response = await apiClient.put(url, data, config);
    return response.data;
  } catch (e) {
    console.error("Auth PUT request failed:", e);
  }
};

export const authGetRequest = async (url: string) => {
  try {
    const token = Cookies.get("token");

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await apiClient.get(url, config);

    return response;
  } catch (error) {
    console.error("Auth GET request failed:", error);
    throw error;
  }
};

export const authPatchRequest = async (url: string, data: any) => {
  try {
    const token = Cookies.get("token");

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await apiClient.patch(url, data, config);

    return response;
  } catch (error) {
    console.error("Auth PATCH request failed:", error);
    throw error;
  }
};
