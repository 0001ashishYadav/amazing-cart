"use client";

import { apiClient } from "../utils/apiClient";
import { getCookie, setCookie } from "../utils/cookies";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLogin, setIsLogin] = useState(() => {
    const access_token = getCookie("access_token");

    if (access_token === null || access_token.length <= 0) {
      return false;
    }

    return true;
  });

  const fetchMyProfile = async () => {
    try {
      const data = await apiClient.fetchMyProfile();
      if (data.error) {
        alert(data.message);
        return;
      }
      setUserProfile(data);
      console.log("User Profile", data);
    } catch (error) {
      console.log("Error fetching profile", error);
    }
  };

  const renewToken = async () => {
    try {
      const data = await apiClient.refreshAccessToken();

      const { access_token, access_token_expires_at } = data;
      const accessTokenExpiresAt = Date.parse(access_token_expires_at);

      const currentMilies = Date.now();
      setCookie(
        "access_token",
        access_token,
        parseInt(`${(accessTokenExpiresAt - currentMilies) / 1000}`)
      );

      setIsLogin(true);
    } catch (error) {
      cosole.log("Error renewing token", error);
    }
  };

  useEffect(() => {
    const checkLogin = () => {
      const accessToken = getCookie("access_token");
      const refreshToken = getCookie("refresh_token");

      if (accessToken || accessToken !== null) {
        return;
      }

      if (refreshToken && refreshToken !== null) {
        renewToken();
        return;
      } else {
        if (isLogin) {
          window.location.reload();
        }
      }
    };

    const loginInterval = setInterval(checkLogin, 1000);
    if (isLogin) {
      fetchMyProfile();
    }

    return () => clearInterval(loginInterval);
  }, [isLogin]);

  const value = {
    isLogin,
    setIsLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      <div>{children}</div>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
