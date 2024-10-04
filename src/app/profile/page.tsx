"use client";
import Header from "@/components/__component/Header";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Get the token and userId from localStorage
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUserId) {
      setUserId(JSON.parse(storedUserId));
    }
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-[100vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="mt-4">
          <p>
            <strong>Token:</strong> {token || "No token found"}
          </p>
          <p>
            <strong>User ID:</strong> {userId || "No user ID found"}
          </p>
        </div>
      </div>
    </>
  );
}
