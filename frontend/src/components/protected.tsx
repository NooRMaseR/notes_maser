import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../utils/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import { jwtDecode } from "jwt-decode";

import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    auth();
  });

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthed(true);
      } else {
        setIsAuthed(false);
      }
    } catch {
      setIsAuthed(false);
    }
  };

  const auth = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setIsAuthed(false);
        return;
      }

      const decode = jwtDecode(token);
      if (!decode.exp) {
        setIsAuthed(false);
        return;
      }
      if (decode.exp < Date.now() / 1000) {
        await refreshToken();
      } else {
        setIsAuthed(true);
      }
    } catch {
      setIsAuthed(false);
    }
  };

  if (isAuthed === null) {
    return <h1>Loading...</h1>;
  }

  return isAuthed ? children : <Navigate to="/login" />;
}
